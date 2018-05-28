import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello';

const dest = document.getElementById('app');
// console.log(dest);
// if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
//   console.error(
//     'Server-side React render was discarded.',
//     'Make sure that your initial render does not contain any client-side code.'
//   );
// }

ReactDOM.render(<Hello />, dest);
