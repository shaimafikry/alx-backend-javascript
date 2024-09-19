0x05. NodeJS Basics

# task 1
The difference between the two approaches lies in how they handle input from `stdin` and trigger program termination.

### 1. Using `process.stdin.on('data')` (previous example):
- **Behavior**: This method fires when the user provides input, processes it immediately, and then exits the program after handling the input.
- **Input Handling**: It captures the user's input and immediately processes it (printing the name and the closing message) and then terminates the process.
- **End of Program**: The program ends automatically after handling input because `process.exit()` is called right after printing the messages.

### 2. Using `process.stdin.on('readable')` (your current code):
- **Behavior**: The `readable` event fires when there is data to be read from `stdin`, but it does not immediately close the program after processing the input. The program will remain open and wait for the `end` event (which is triggered by sending an EOF signal like `Ctrl+D`).
- **Input Handling**: The input is read using `process.stdin.read()`, and the program will display the message. However, the program will not automatically close until the user explicitly ends the input (like with `Ctrl+D`).
- **End of Program**: The `process.stdin.on('end')` event handler ensures the program prints the final message and closes, but this only happens when the input stream ends (e.g., when the user presses `Ctrl+D`).

### Key Differences:
1. **Immediate vs. Manual Exit**:
   - **`on('data')`**: Automatically ends after printing the input and the closing message.
   - **`on('readable')` + `on('end')`**: Requires the user to manually end the input (e.g., `Ctrl+D`) before the closing message is displayed.

2. **Closing Trigger**:
   - **`on('data')`**: The program terminates based on the `process.exit()` call right after the input is processed.
   - **`on('readable')`**: The program stays open until an explicit EOF signal is given to end the stream.

If you want the behavior where the program immediately closes after input, then you should go with `on('data')`. If you want the user to control when the program ends (with something like `Ctrl+D`), then the `on('readable')` + `on('end')` approach is valid. 

For child process testing where the program needs to finish on its own, the `on('data')` method is generally simpler to work with.


The `readable` event and the `data` event in Node.js serve similar purposes when handling streams like `stdin`, but they differ in how and when they are triggered, as well as in how they manage the data flow from the stream.

Here’s a detailed comparison between the two:

### 1. **`readable` Event**
- **How it works**: The `readable` event is fired when there is data available to read from the stream. However, it doesn’t actually provide the data directly. Instead, it signals that you should manually call `stream.read()` to retrieve the data.
- **Usage**: It gives more control over how much data to read, especially useful in scenarios where you need to handle large amounts of data or read specific amounts (e.g., reading chunks of a specific size).
- **Flow Control**: It operates in **paused mode** by default. You manually call `read()` to pull data from the stream.
  
#### Example:
```javascript
process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    console.log(`Received: ${chunk}`);
  }
});
```
- **How it behaves**: The `readable` event fires when there's data to be read. You need to manually call `process.stdin.read()` to pull the data out of the stream. You can control how much data is read (e.g., by passing a byte size to `read()`).
  
#### Key Characteristics of `readable`:
- **Manual data reading**: You need to explicitly call `stream.read()` to get the data.
- **More control**: Good for scenarios where you need fine-grained control over the data, like handling large files or streaming.
- **Stream stays open**: The stream doesn’t close or end automatically until you signal it with `stream.end()` or similar.

### 2. **`data` Event**
- **How it works**: The `data` event is fired automatically whenever there is data available, and it provides the data directly as an argument to the event handler.
- **Usage**: Typically used when you want to process the data as it comes in, without needing fine control over how much data is read.
- **Flow Control**: It operates in **flowing mode** by default. Data is automatically read from the stream and provided to the `data` event handler.
  
#### Example:
```javascript
process.stdin.on('data', (data) => {
  console.log(`Received: ${data}`);
});
```
- **How it behaves**: The `data` event fires every time there’s a chunk of data, and it passes the data directly to the callback. You don’t need to manually call `read()`.

#### Key Characteristics of `data`:
- **Automatic data flow**: The data is automatically provided to the event handler without the need for explicit `read()` calls.
- **Less control**: It’s simpler but doesn’t give you control over how much data is read. It’s suitable for small or manageable chunks of data.
- **Stream ends when input stops**: When there’s no more data, the stream will close after all `data` events have been emitted.

### Summary of Differences:

| Feature                 | `readable` Event                                   | `data` Event                                          |
|-------------------------|----------------------------------------------------|-------------------------------------------------------|
| **Triggered When**       | Data is available to be read                      | Data is ready and immediately passed to the handler   |
| **Data Retrieval**       | Must call `stream.read()` manually                 | Data is provided automatically in the event handler   |
| **Flow Mode**            | Paused mode (manual reading)                      | Flowing mode (automatic reading)                      |
| **Control Over Data**    | More control (can read specific chunks of data)    | Less control (data is passed in chunks as available)  |
| **Typical Use Cases**    | Large data sets, fine-grained control needed       | Simple data handling, standard user input             |
| **Automatic Stream End** | No (manual control needed)                        | Yes (ends after all data is received)                 |

### When to Use `readable`:
- When you need fine-grained control over how data is read from the stream.
- Useful for large data streams where you want to read a specific number of bytes at a time.
- **Example**: Reading chunks of a file in a controlled manner.

### When to Use `data`:
- When you want to receive and process data as soon as it’s available.
- Simpler and more straightforward for typical scenarios like reading user input or handling network data.
- **Example**: Reading from `stdin` in an interactive command-line tool.

In your case, for interactive programs, the `data` event is more convenient because it simplifies handling user input, as the data comes in chunks and is automatically passed to your handler. The `readable` event provides more flexibility but requires manual intervention to read the data.
