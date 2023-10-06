/**
 * The `Left` class is a representation of an Error.
 * It is primarely used for, instead of throwing,
 * returning an error from the method execution.
 */
class Left<TLeftValue extends Error, TRightValue> {
  public readonly value: TLeftValue;

  public constructor(value: TLeftValue) {
    this.value = value;
  }

  public isLeft(): this is Left<TLeftValue, TRightValue> {
    return true;
  }

  public isRight(): this is Right<TLeftValue, TRightValue> {
    return false;
  }
}

/**
 * The `Right` class is the representation of the
 * success of a method execution. It encapsulates the
 * returned value from the sucessful method execution.
 */
class Right<TLeftValue extends Error, TRightValue> {
  public readonly value: TRightValue;

  public constructor(value: TRightValue) {
    this.value = value;
  }

  public isLeft(): this is Left<TLeftValue, TRightValue> {
    return false;
  }

  public isRight(): this is Right<TLeftValue, TRightValue> {
    return true;
  }
}

/**
 * The `Either` type represents the two possible outcomes from a
 * function/method execution: **Either** an **Error (Left)** or
 * **either** **Success (Right)**.
 *
 * The pattern can be explained by the natural flow of the code:
 * When there is no error, the code always flow to the **right**
 * to continue the execution, but when the code throws, it returns
 * to the **left** for handling the exception.
 */
export type Either<L extends Error, R> = Left<L, R> | Right<L, R>;

/**
 * @param value a class instance that extends from `Error`
 * @returns {Left} a `Left` class instance with the encapsulated value
 */
export const left = <L extends Error, R>(value: L): Either<L, R> => {
  return new Left(value);
};

/**
 * @param value any value that matches the `R` type constraint
 * @returns {Right} a `Right` class instance with the encapsulated value
 */
export const right = <L extends Error, R>(value: R): Either<L, R> => {
  return new Right(value);
};
