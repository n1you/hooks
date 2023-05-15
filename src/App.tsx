import './App.css';
import { useState } from './hooks';

function App() {
    const [num, serNum] = useState(1);
    const [a, seta] = useState({ name: '1' });

    return (
        <div
            onClick={() => {
                serNum(
                    (e) => e + 1,
                    (value) => {
                        console.log(value === num);
                        console.log('new number', value);

                        console.log(num);
                    },
                );
                seta({ name: new Date().getTime().toString() }, (b) => {
                    console.log(a);
                    console.log(b);
                });
            }}
        >
            {num}
            <div>name: {a.name}</div>
        </div>
    );
}

export default App;
