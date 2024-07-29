/*Write a function named divideFunction that will accept two arguments: numerator (Number) and denominator (Number).

When the denominator argument is equal to 0, the function should throw a new error with the message cannot divide by 0. Otherwise it should return the numerator divided by the denominator.*/

export default function divideFunction(numerator, denominator) {
try {
  if (denominator === 0){
    throw new Error;
  }
  return `${numerator}` / `${denominator}`;
} catch{
  return 'cannot divide by 0';

}
}
