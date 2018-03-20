using SixLabors.ImageSharp;
using SixLabors.Primitives;
using System;
using System.Collections.Generic;
using System.Text;

namespace Soar.ImagePreview
{
    public static class ImageSharpHelpers
    {
        public static Image<TColor> Resize<TColor>(this Image<TColor> image, int maxWidthOrHeight)
           where TColor : struct, IPackedPixel, IEquatable<TColor>
        {
            var size = image.Width > image.Height
                ? new Size(maxWidthOrHeight, image.Height * maxWidthOrHeight / image.Width)
                : new Size(image.Width * maxWidthOrHeight / image.Height, maxWidthOrHeight);

            return image.Resize(size);
        }

    }
}
