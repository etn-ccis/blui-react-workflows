import { subMilliseconds, differenceInMilliseconds } from 'date-fns';

let timeTravelOffset = 0;
let frozenTime: Date | undefined;

const internalNow = (): Date => {
    if (frozenTime) {
        return frozenTime;
    }

    return subMilliseconds(new Date(), timeTravelOffset);
};

const now = (): Date => internalNow();

const assertInTest = (): void => {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Time travel is only allowed in tests!');
    }
};

const timeTravel = (time: Date | string): void => {
    assertInTest();
    timeTravelOffset = differenceInMilliseconds(new Date(), typeof time === 'string' ? new Date(time) : time);
    frozenTime = undefined;
};

const restoreTime = (): void => {
    assertInTest();
    timeTravelOffset = 0;
    frozenTime = undefined;
};

const freezeTime = (time: Date | string | undefined): void => {
    assertInTest();
    if (time) {
        timeTravel(time);
    }

    frozenTime = internalNow();
};

const unfreezeTime = (): void => {
    assertInTest();
    frozenTime = undefined;
};

export const Clock = {
    now,
    Testing: {
        timeTravel,
        restoreTime,
        freezeTime,
        unfreezeTime,
    },
};
