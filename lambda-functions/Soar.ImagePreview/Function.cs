using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.S3Events;
using Amazon.S3;
using System.IO;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using Amazon.S3.Model;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing.Transforms;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.ImagePreview
{
    public class Function
    {

        private readonly string[] _supportedImageTypes = new string[] { ".jpg", ".jpeg" };

        IAmazonS3 S3Client { get; set; }

        /// <summary>
        /// Default constructor. This constructor is used by Lambda to construct the instance. When invoked in a Lambda environment
        /// the AWS credentials will come from the IAM role associated with the function and the AWS region will be set to the
        /// region the Lambda function is executed in.
        /// </summary>
        public Function()
        {
            S3Client = new AmazonS3Client();
        }

        /// <summary>
        /// Constructs an instance with a preconfigured S3 client. This can be used for testing the outside of the Lambda environment.
        /// </summary>
        /// <param name="s3Client"></param>
        public Function(IAmazonS3 s3Client)
        {
            this.S3Client = s3Client;
        }

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<string> FunctionHandler(S3Event evnt, ILambdaContext context)
        {
            var bucketName = Environment.GetEnvironmentVariable("s3_bucket_name");
            var s3Event = evnt.Records?[0].S3;
            if (s3Event == null)
            {
                return null;
            }
            if (!_supportedImageTypes.Contains(Path.GetExtension(s3Event.Object.Key).ToLower()))
            {
                context.Logger.LogLine($"Object {s3Event.Bucket.Name}:{s3Event.Object.Key} is not a supported image type");
                return null;
            }
            using (var objectResponse = await S3Client.GetObjectAsync(s3Event.Bucket.Name, s3Event.Object.Key))
            using (Stream output = new MemoryStream())
            using (Stream responseStream = objectResponse.ResponseStream)
            {
                using (Image<Rgba32> image = Image.Load(responseStream))
                {
                    float maxHeight = 300;    // Max height for the image
                    float ratio = 0;  // Used for aspect ratio
                    int width = image.Width;    // Current image width
                    int height = image.Height;  // Current image height
                    context.Logger.LogLine($"Image width: {width} height: {height}");

                    // Check if current height is larger than max
                    if (height > maxHeight)
                    {
                        ratio = maxHeight / height; // get ratio for scaling image
                        width = (int)(width * ratio);    // Reset width to match scaled image
                        height = (int)(height * ratio);    // Reset height to match scaled image
                    }
                    context.Logger.LogLine($"Image for resizing width: {width} height: {height}");
                    image.Mutate(x => x
                         .Resize(width, height));
                    image.Save(output, new JpegEncoder());
                    await S3Client.PutObjectAsync(new PutObjectRequest
                    {
                        BucketName = bucketName,
                        Key = s3Event.Object.Key,
                        InputStream = output
                    });
                }
            }
            context.Logger.LogLine($"Bucket name: {s3Event.Bucket.Name} and object name: {s3Event.Object.Key}.");
            return "OK";
        }
    }
}
