/*
    MIME Type

    MIME types are used in numerous internet protocols to associate a media type (html, image, video ...) with the content sent. 
    The MIME type is generally inferred from the extension of the file to be sent.

    You have to write a program that makes it possible to detect the MIME type of a file based on its name.

    Rule
    You are provided with a table which associates MIME types to file extensions. 
    You are also given a list of names of files to be transferred and for each one of these files, you must find the MIME type to be used.

    The extension of a file is defined as the substring which follows the last occurrence, if any, of the dot character within the file name.
    If the extension for a given file can be found in the association table (case insensitive, e.g. TXT is treated the same way as txt), then print the corresponding MIME type. 
    If it is not possible to find the MIME type corresponding to a file, or if the file doesn’t have an extension, print UNKNOWN.

    Input
        • mimeTypes: an array of strings which each string represents a file extension per line and the corresponding MIME type (separated by a blank space).
        • fileNames: an array of strings which each string represents a file name that it's corresponding MIME type need to be found in association table.

    Output
    An array of strings which each string represents a corresponding MIME type of the input 'fileNames' or UNKNOWN.

    Constraints:
        • 0 < mimeTypes length < 10000
        • 0 < fileNames length < 10000
        • File extensions are composed of a maximum of 10 alphanumerical ASCII characters.
        • MIME types are composed of a maximum 50 alphanumerical and punctuation ASCII characters.
        • File names are composed of a maximum of 256 alphanumerical ASCII characters and dots (full stops).
        • There are no spaces in the file names, extensions or MIME types.

    Example 1:
        Input: mimeTypes = ["html text/html", "png image/png", "gif image/gif"], fileNames = ["animated.gif", "portrait.png", "index.html"]
        Output: ["gif image/gif", "png image/png", "html text/html"]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_FILE_EXTENSION = "File extensions are composed of a maximum of 10 alphanumerical ASCII characters without any space.",
  INVALID_FILE_NAME = "File names are composed of a maximum of 256 alphanumerical ASCII characters and dots (full stops) without any space.",
  INVALID_MIME_TYPE = "MIME types are composed of a maximum 50 alphanumerical and punctuation ASCII characters without any space.",
  OUT_OF_RANGE_FILE_NAMES = "The length of input 'fileNames' should be between 1 and 9999.",
  OUT_OF_RANGE_MIME_TYPES = "The length of input 'mimeTypes' should be between 1 and 9999.",
}

const isValid = (mimeTypes: string[], fileNames: string[]) => {
  switch (true) {
    case mimeTypes.length <= 0 || mimeTypes.length >= 10000: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_MIME_TYPES);
    }
    case fileNames.length <= 0 || fileNames.length >= 10000: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_FILE_NAMES);
    }
    case !mimeTypes.reduce(
      (valid, mimeType) =>
        valid && /^[0-9A-Za-z]{1,10}$/.test(mimeType.split(" ")[0]),
      true
    ): {
      throw new Error(ErrorEnum.INVALID_FILE_EXTENSION);
    }
    case !mimeTypes.reduce(
      (valid, mimeType) =>
        valid && /^[\+\-\.\/0-9A-Za-z]{1,49}$/.test(mimeType.split(" ")[1]),
      true
    ): {
      throw new Error(ErrorEnum.INVALID_MIME_TYPE);
    }
    case !fileNames.reduce(
      (valid, fileName) => valid && /^[\.0-9A-Za-z]{1,256}$/.test(fileName),
      true
    ): {
      throw new Error(ErrorEnum.INVALID_FILE_NAME);
    }
    default: {
      return true;
    }
  }
};

export const solution = (mimeTypes: string[], fileNames: string[]) => {
  isValid(mimeTypes, fileNames);

  const mimeTable = mimeTypes.map((mimeType) => {
    const splitted = mimeType.split(" ");

    return { extension: splitted[0], mimeType: splitted[1] };
  });

  const result = fileNames.map((fileName) => {
    const dotFound = fileName.includes(".");

    if (!dotFound) return "UNKNOWN";

    const splitted = fileName.split(".");

    const extension = splitted[splitted.length - 1];

    const found = mimeTable.find(
      (row) => row.extension.toLowerCase() === extension.toLowerCase()
    );

    return found ? found.mimeType : "UNKNOWN";
  });

  return result;
};
