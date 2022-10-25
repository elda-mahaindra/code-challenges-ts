import type * as Challenge020 from "../challenges/challenge_020";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge020>(
  "../challenges/challenge_020.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      N: 1,
      message: "ghibcadef",
    },
    output: "abcdefghi",
  },
  {
    id: 1,
    input: {
      N: -1,
      message: "hello world",
    },
    output: "worlelhlo d",
  },
  {
    id: 2,
    input: {
      N: 5,
      message: "hitoeplmu eneicldts aide  tsxt ",
    },
    output: "this is a mutliple encoded text",
  },
  {
    id: 3,
    input: {
      N: -6,
      message: "hello worlds",
    },
    output: "hrlellwo ods",
  },
  {
    id: 4,
    input: {
      N: 3,
      message:
        " rius lorem. Duis risus nunc, condimentum at metun lacinia id. Pellentebortis. Suspendttis sed , maxis ornare nipulvinar. In v aliquam erat maximus bibenetus neque, tempus lovarius ipsnare vel. Donec , vitae sx enim. Sed vitaes sed nei ipFusces t. e at sum. Alt nibhgittidisse eu eteger id cursumque vel dui et libs.Maecenash. Suspendisse tristiqueeu condcondimentum atec orDui sitipsuorLem m dolteger quismus eget i ssim lacuss. Suspum feron arcu idvinar id eula elit in effiuspenlor. in blandem solm ne i psuc lorlicitudit ut acSIn luctus vcitur vae pulat arcu ferment maximus. Integerendisse hendrim. Inmentum nibh non dum.  amet, tur adlit. Fusceci pretium iacsi ut felibm neque, quis dignis orligsx nec sagi aliquam do maximuaodo nulla. isi quis, iquam esdu, npretium comMauris as. Ins elitque a mattittis. Morbi volutpat eroegestas irit vel ante ac dignisss nes scing elitconsecteoripi. Quisque msagiel puruuli mollis n enim est, ac bibendumissmentum. Ut dictum mi vel luctus rhoncus.tempor id.",
    },
    output:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque metus neque, sagittis sed condimentum at, maximus eget elit. Fusce condimentum nibh non erat maximus bibendum. Duis ornare nisi ut felis aliquam pulvinar. In vel purus nec orci pretium iaculis. Suspendisse hendrerit vel ante ac dignissim. Integer quis mollis nibh. Suspendisse tristique enim est, ac bibendum metus ornare vel. Donec egestas non arcu id maximus. Integer varius ipsum neque, quis dignissim lacus lacinia id. Pellentesque vel dui et libero tempus lobortis. Suspendisse pulvinar id ex nec sagittis. Morbi volutpat ligula at arcu fermentum fermentum. Ut maximus sed neque a mattis.Maecenas dictum mi vel luctus rhoncus. Suspendisse eu ex enim. Sed vitae aliquam dolor. In luctus velit in efficitur varius. Integer id cursus elit, vitae sagittis lorem. Duis risus nunc, condimentum at nisi quis, pretium commodo nulla. Mauris a ipsum nec lorem sollicitudin blandit ut ac est. Fusce at dui ipsum. Aliquam est nibh, tempor id.",
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      N: 1,
      message: "",
    },
    error: ErrorEnum.OUT_OF_RANGE_MESSAGE,
  },
  {
    id: 1,
    input: {
      N: 11,
      message: "ghibcadef",
    },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
];

describe("test challenge 020", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { N, message } = input;

    expect(solution(N, message)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { N, message } = input;

    expect(() => solution(N, message)).toThrow(error);
  });
});
