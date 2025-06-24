// https://gist.github.com/yahm23/5e8c19335d97df8233ce8ca8b10896f6/raw/6bc33c5be940f6d53e5aaf50a730d8028b513ad4/dateTime.js
import { useEffect, useState } from 'react';

const LiveTime = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(
            () => setDate(new Date()),
            1000
        )

        return () => clearInterval(timer);


    });
    return <p className="text-sm font-medium">{date.toLocaleTimeString()}</p>
}

export default LiveTime