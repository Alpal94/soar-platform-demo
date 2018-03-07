import { 
  getName
} from './soarService';

test('getName', async () => {
  try {
    const name = await getName('3');
    console.log('name', name);
  } catch(err) {
    console.log(err);
  }
});