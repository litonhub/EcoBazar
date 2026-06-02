import React, { useState, useEffect } from "react";

const ResendTimer = () => {
    const [time, setTime] = useState(30);
    const [active, setActive] = useState(false);

    useEffect(() => {
        let interval;

        if (active && time > 0) {
            interval = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        }

        if (time === 0) {
            setActive(false);
        }

        return () => clearInterval(interval);
    }, [active, time]);

    const handleResend = () => {
        if (active) return;

        setTime(30);
        setActive(true);

        console.log("Resend clicked");
    };

    return (
        <h5 className="defaultfs text-grynine pb-4 ps-1 text-start flex items-center gap-2">
            Didn’t receive a mail?

            <span
                onClick={handleResend}
                className={`underline font-medium ${active
                        ? "text-grynine cursor-not-allowed opacity-70"
                        : "text-primary cursor-pointer"
                    }`}
            >
                Resend
            </span>

            {active && (
                <span className="text-sm text-primary">
                    {time}s
                </span>
            )}
        </h5>
    );
};

export default ResendTimer;