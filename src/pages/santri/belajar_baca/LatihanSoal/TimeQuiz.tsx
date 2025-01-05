/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
import Countdown from 'react-countdown';

const TimeQuiz = (props: { Time: any }) => {
    const Completionist = () => <span>You are good to go!</span>;
    return (
        <>
            <Countdown date={props.Time}>
                <Completionist />
            </Countdown>
        </>
    )
};

export default TimeQuiz;