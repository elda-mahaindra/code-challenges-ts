import type * as Challenge011 from "../challenges/challenge_011";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge011>(
  "../challenges/challenge_011.ts"
);

const successCases = [
  {
    input: {
      mimeTypes: ["html text/html", "png image/png", "gif image/gif"],
      fileNames: ["animated.gif", "portrait.png", "index.html"],
    },
    output: ["image/gif", "image/png", "text/html"],
  },
  {
    input: {
      mimeTypes: ["txt text/plain", "xml text/xml", "flv video/x-flv"],
      fileNames: ["image.png", "animated.gif", "script.js", "source.cpp"],
    },
    output: ["UNKNOWN", "UNKNOWN", "UNKNOWN", "UNKNOWN"],
  },
  {
    input: {
      mimeTypes: ["wav audio/x-wav", "mp3 audio/mpeg", "pdf application/pdf"],
      fileNames: [
        "a",
        "a.wav",
        "b.wav.tmp",
        "test.vmp3",
        "pdf",
        ".pdf",
        "mp3",
        "report..pdf",
        "defaultwav",
        ".mp3.",
        "final.",
      ],
    },
    output: [
      "UNKNOWN",
      "audio/x-wav",
      "UNKNOWN",
      "UNKNOWN",
      "UNKNOWN",
      "application/pdf",
      "UNKNOWN",
      "application/pdf",
      "UNKNOWN",
      "UNKNOWN",
      "UNKNOWN",
    ],
  },
  {
    input: {
      mimeTypes: [
        "png image/png",
        "TIFF image/TIFF",
        "css text/css",
        "TXT text/plain",
      ],
      fileNames: [
        "example.TXT",
        "referecnce.txt",
        "strangename.tiff",
        "resolv.CSS",
        "matrix.TiFF",
        "lanDsCape.Png",
        "extract.cSs",
      ],
    },
    output: [
      "text/plain",
      "text/plain",
      "image/TIFF",
      "text/css",
      "image/TIFF",
      "image/png",
      "text/css",
    ],
  },
];

const failureCases = [
  {
    input: {
      mimeTypes: [],
      fileNames: ["animated.gif", "portrait.png", "index.html"],
    },
    error: ErrorEnum.OUT_OF_RANGE_MIME_TYPES,
  },
  {
    input: {
      mimeTypes: ["html text/html", "png image/png", "gif image/gif"],
      fileNames: [],
    },
    error: ErrorEnum.OUT_OF_RANGE_FILE_NAMES,
  },
  {
    input: {
      mimeTypes: ["h-t-m-l text/html", "png image/png", "gif image/gif"],
      fileNames: ["animated.gif", "portrait.png", "index.html"],
    },
    error: ErrorEnum.INVALID_FILE_EXTENSION,
  },
  {
    input: {
      mimeTypes: [
        "html text/html",
        "png image/png",
        "gif image/gifimage/gifimage/gifimage/gifimage/gifimage/gif",
      ],
      fileNames: ["animated.gif", "portrait.png", "index.html"],
    },
    error: ErrorEnum.INVALID_MIME_TYPE,
  },
  {
    input: {
      mimeTypes: ["html text/html", "png image/png", "gif image/gif"],
      fileNames: ["ani mated.gif", "portrait.png", "index.html"],
    },
    error: ErrorEnum.INVALID_FILE_NAME,
  },
];

describe("test challenge 011", () => {
  it.each(successCases)(
    "returns '$output' when mimeTypes = '$input.mimeTypes' and fileNames = '$input.fileNames'",
    ({ input, output }) => {
      const { mimeTypes, fileNames } = input;

      expect(solution(mimeTypes, fileNames)).toEqual(output);
    }
  );

  it.each(failureCases)(
    "throws an error '$error' when mimeTypes = '$input.mimeTypes' and fileNames = '$input.fileNames'",
    ({ input, error }) => {
      const { mimeTypes, fileNames } = input;

      expect(() => solution(mimeTypes, fileNames)).toThrow(error);
    }
  );
});
