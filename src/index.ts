// import _ from 'lodash';
// import { setTimeout } from 'node:timers/promises';
// import fs from 'node:fs/promises';
// import printf from "printf";

// const main = async () => {
//   while (true) {
//     console.clear();
//     try {
//       const data = await fs.readFile('log-generator/access.log', { encoding: 'utf8' });
//       console.log(printf('%(lineCount)s lines', {
//         lineCount: _.size(data.match(/\n/g)),
//       }));
//     } catch (err) {
//       console.log(err);
//     }
//     await setTimeout(500);
//   }
// };

// main();

import { app } from './app';
import _ from 'lodash';
import { setTimeout } from 'node:timers/promises';
import fs from 'node:fs/promises';
import printf from "printf";

const PORT = 3000;

const main = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  while (true) {
    console.clear();
    try {
      const data = await fs.readFile('log-generator/access.log', { encoding: 'utf8' });
      console.log(printf('%(lineCount)s lines', {
        lineCount: _.size(data.match(/\n/g)),
      }));
    } catch (err) {
      console.log(err);
    }
    await setTimeout(500);
  }
};

main();
