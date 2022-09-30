import type * as Challenge008 from "../challenges/challenge_008";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge008>(
  "../challenges/challenge_008.ts"
);

const successCases = [
  {
    input: {
      N: 8,
      playerSigns: ["4 R", "1 P", "8 P", "3 R", "7 C", "5 S", "6 L", "2 L"],
    },
    output: "2 6 5 1",
  },
  {
    input: {
      N: 2,
      playerSigns: ["1 S", "2 S"],
    },
    output: "1 2",
  },
  {
    input: {
      N: 32,
      // prettier-ignore
      playerSigns: [
        '28 R', '3 R',  '13 L', '6 P',
        '32 C', '5 R',  '11 S', '27 S',
        '22 L', '31 R', '30 R', '10 P',
        '18 R', '23 R', '8 R',  '20 S',
        '7 P',  '19 P', '26 P', '4 R',
        '16 C', '21 P', '1 C',  '14 C',
        '29 R', '9 P',  '25 C', '24 P',
        '15 R', '2 L',  '12 L', '17 S',
      ],
    },
    output: "10 30 31 20 11 15",
  },
  {
    input: {
      N: 128,
      // prettier-ignore
      playerSigns: [
        '35 R',  '66 R',  '68 R',  '81 R',
        '27 R',  '88 R',  '74 R',  '125 R',
        '116 R', '9 R',   '115 R', '4 R',
        '52 R',  '111 R', '103 R', '77 R',
        '114 R', '71 R',  '113 R', '100 R',
        '112 R', '3 R',   '85 R',  '57 R',
        '13 R',  '60 R',  '47 R',  '31 R',
        '122 R', '50 R',  '44 R',  '106 R',
        '86 R',  '65 R',  '22 R',  '37 R',
        '26 R',  '43 R',  '55 R',  '42 R',
        '23 R',  '45 R',  '89 R',  '91 R',
        '28 R',  '63 R',  '18 R',  '67 R',
        '34 R',  '127 R', '107 R', '41 R',
        '36 R',  '61 R',  '97 R',  '87 R',
        '118 R', '110 R', '96 R',  '40 R',
        '14 R',  '102 R', '84 R',  '126 R',
        '117 R', '83 R',  '101 R', '80 R',
        '58 R',  '82 R',  '119 R', '72 R',
        '51 R',  '21 R',  '33 R',  '8 R',
        '1 R',   '7 R',   '92 R',  '25 R',
        '16 R',  '30 R',  '79 R',  '46 R',
        '94 R',  '120 R', '59 R',  '121 R',
        '108 R', '69 R',  '73 R',  '124 R',
        '12 R',  '93 R',  '78 R',  '5 R',
        '29 R', '70 R',  '109 R', '48 R',
        '64 R', '76 R',  '38 R',  '104 R',
        '75 R', '128 P', '20 R',  '2 R',
        '95 R', '62 R',  '10 R',  '56 R',
        '99 R', '39 R',  '105 R', '19 R',
        '15 R', '17 R',  '54 R',  '90 R',
        '6 R',  '98 R',  '123 R', '49 R',
        '32 R', '11 R',  '53 R',  '24 R',
      ],
    },
    output: "128 75 2 10 29 6 1 3",
  },
  {
    input: {
      N: 1024,
      // prettier-ignore
      playerSigns: [
        '292 C', '827 R', '945 S', '974 R',
        '440 S', '685 P', '266 L', '409 S',
        '153 S', '202 C', '843 P', '318 P',
        '888 S', '544 C', '724 S', '900 C',
        '438 P', '573 L', '879 S', '646 S',
        '204 R', '190 L', '661 P', '793 P',
        '39 L',  '370 P', '320 L', '916 R',
        '854 C', '504 P', '653 L', '160 S',
        '756 R', '246 L', '878 R', '375 L',
        '689 P', '549 S', '548 R', '759 L',
        '406 C', '87 R',  '308 C', '887 C',
        '157 L', '37 R',  '556 P', '872 R',
        '502 S', '286 C', '749 P', '464 S',
        '65 P',  '563 R', '902 C', '50 R',
        '103 P', '909 L', '384 C', '648 L',
        '706 S', '314 C', '560 C', '961 P',
        '182 L', '847 P', '621 R', '522 P',
        '16 C',  '710 L', '122 L', '956 R',
        '399 R', '253 P', '487 R', '398 S',
        '101 R', '545 L', '952 S', '84 L',
        '842 R', '512 C', '555 P', '848 C',
        '596 C', '523 L', '475 R', '572 L',
        '726 C', '599 C', '508 C', '731 S',
        '221 S', '47 S',  '881 C', '460 S',
        '278 S', '579 R', '750 C',  '937 P',
        '620 P', '220 L', '162 R',  '391 P',
        '982 S', '671 S', '1002 C', '225 S',
        '606 S', '10 C',  '268 S',  '855 L',
        '115 L', '338 R', '766 C',  '932 S',
        '611 P', '567 C', '612 C',  '217 S',
        '761 C', '853 P', '807 R',  '403 C',
        '426 S', '664 S', '216 S',  '446 L',
        '297 R', '64 S',   '619 R', '530 S',
        '55 L',  '993 P',  '763 R', '453 R',
        '339 C', '951 P',  '335 R', '212 S',
        '330 C', '233 L',  '626 P', '304 P',
        '819 L', '382 C',  '383 S', '156 P',
        '442 S', '814 P',  '108 L', '792 C',
        '769 C', '582 R',  '119 S', '273 C',
        '22 C',  '1021 C', '295 R', '752 C',
        '348 L', '499 L', '928 C',  '569 P',
        '711 R', '904 P', '901 L',  '363 P',
        '51 C',  '942 L', '165 P',  '649 S',
        '944 C', '255 L', '329 P',  '343 S',
        '772 R', '840 L', '1011 P', '862 C',
        '275 C', '663 C', '145 C',  '293 L',
        '913 S', '682 R', '128 S',  '13 C',
        '392 P', '25 S',  '81 P',   '532 R',
        '922 P',  '211 C', '432 C', '317 P',
        '241 S',  '14 R',  '667 L', '349 R',
        '828 P',  '118 P', '851 C', '164 L',
        '795 C',  '976 R', '323 S', '168 C',
        '1003 S', '372 C', '746 C', '62 C',
        '180 P',  '15 S',  '571 S', '179 S',
        '693 R',  '68 R',  '351 L', '837 S',
        '245 C',  '985 P', '971 S', '265 P',
        '794 S', '997 C', '760 R', '332 C',
        '639 S', '581 S', '250 R', '835 R',
        '725 P', '402 L', '89 L',  '491 C',
        '376 C', '218 C', '591 P', '607 R',
        '70 L',  '550 P', '604 L', '271 C',
        '647 C', '374 R', '561 S', '445 C',
        '953 L', '421 S', '969 S', '457 L',
        '876 C', '131 P', '124 R', '903 C',
        '779 P', '381 S', '727 S', '334 P',
        '104 P', '346 P', '580 L', '281 L',
        '366 S', '177 R', '551 R', '743 L',
        '60 P',  '472 R', '627 P', '608 S',
        '656 S', '748 R', '467 R', '315 S',
        '589 P', '636 R', '99 L',  '480 P',
        '79 P',  '123 S', '252 C', '49 C',
        '931 R', '773 S', '373 R', '40 R',
        '690 C', '714 L', '405 L', '361 R',
        '767 R', '188 R', '575 L', '670 C',
        '808 L', '189 S', '774 R', '657 S',
        '100 R', '207 C', '482 S', '359 P',
        '488 L', '435 P', '416 S', '260 S',
        '307 S', '74 R',  '209 L', '198 P',
        '910 S', '477 C', '401 S', '437 L',
        '964 R', '93 C',  '863 C', '184 S',
        '885 L', '44 C',  '407 S', '389 R',
        '193 R', '783 L', '768 R', '183 C',
        '718 P', '987 S', '388 S', '415 R',
        '705 C', '524 P', '186 P', '26 S',
        '173 S', '592 P', '121 P', '197 P',
        '234 R', '640 R', '613 R', '802 C',
        '741 R', '893 L', '547 L', '187 R',
        '995 S', '677 R', '637 S', '111 C',
        '325 C', '978 S',  '176 L', '408 P',
        '803 C', '495 C',  '23 P',  '898 L',
        '659 L', '428 P',  '159 S', '448 L',
        '820 S', '678 R',  '32 L',  '662 L',
        '578 C', '1008 S', '316 R', '455 R',
        '132 L', '191 L',  '924 P', '350 R',
        '371 S', '787 L',  '397 L', '280 C',
        '683 P', '91 R',   '362 R', '352 L',
        '697 R', '730 C', '810 S',  '576 L',
        '175 S', '5 R',   '341 L',  '106 P',
        '856 S', '712 L', '462 R',  '490 S',
        '466 S', '895 P', '546 R',  '72 R',
        '883 S', '110 S', '638 C',  '860 L',
        '503 L', '907 R', '1000 S', '38 L',
        '994 P', '213 P', '673 S',  '412 P',
        '538 C', '424 R', '631 S',  '540 R',
        '817 S', '303 R', '917 R', '770 P',
        '732 S', '911 L', '78 S',  '364 C',
        '413 P', '215 R', '138 C', '276 P',
        '960 P', '877 R', '958 C', '797 R',
        '95 L',  '866 S', '417 L', '852 S',
        '300 C', '740 C', '679 P', '327 P',
        '651 S', '815 L', '92 R',  '430 R',
        '818 S', '471 C', '722 L', '645 L',
        '566 S', '200 L', '139 L', '418 L',
        '235 S', '800 P', '857 C', '875 S',
        '688 P', '918 R', '166 S', '584 P',
        '947 L', '533 P', '735 S', '850 S',
        '479 S', '658 R', '324 S', '747 L',
        '594 P', '137 S', '833 S', '791 R',
        '112 L', '564 R', '955 S', '949 S',
        '585 C', '762 S', '378 L', '541 S',
        '43 P',  '751 C', '450 P', '136 L',
        '687 L', '980 C', '597 P', '675 L',
        '600 P', '507 R', '577 R', '463 P',
        '871 L', '310 S', '986 S', '444 C',
        '149 R', '674 S', '696 L', '88 S',
        '167 S', '439 R', '181 P', '617 S',
        '557 C', '821 C', '59 L',  '920 S',
        '199 C', '655 P', '473 S', '798 L',
        '1004 L', '411 C', '498 L', '298 C',
        '57 C',   '832 L', '836 P', '733 R',
        '201 R',  '210 C', '713 S', '698 C',
        '754 L',  '742 S', '242 C', '869 S',
        '738 L',  '459 L', '42 C',  '938 R',
        '441 C',  '935 R', '701 L', '927 R',
        '142 R',  '206 S', '358 L', '785 P',
        '299 P',  '67 L',  '972 R', '957 R',
        '859 S', '443 L', '380 C', '114 L',
        '279 S', '35 C',  '386 L', '703 P',
        '744 C', '501 S', '254 S', '71 L',
        '635 S', '870 S', '169 P', '322 P',
        '813 R', '669 C', '929 P', '583 S',
        '868 S', '94 C',  '992 L', '172 C',
        '219 C', '968 P', '102 R', '208 P',
        '586 C', '950 P', '311 C', '231 P',
        '146 R', '125 S', '559 S', '537 S',
        '625 R', '880 P', '143 P', '151 S',
        '642 S', '155 R', '753 L', '864 C',
        '565 R', '258 P', '410 C', '356 S',
        '54 L',  '17 C',  '534 C', '781 L',
        '602 R', '858 S', '943 L', '717 C',
        '130 C', '481 S', '520 S', '400 R',
        '536 R', '312 P', '782 R', '905 R',
        '500 C', '294 L', '82 S',  '1009 L',
        '707 R', '686 P', '614 S', '830 C',
        '360 R', '623 L', '483 S', '270 L',
        '333 L', '873 S', '97 L',  '148 P',
        '891 S', '709 C', '77 P',  '347 S',
        '765 L', '849 C', '665 P', '170 P',
        '553 S', '434 R', '385 L', '1005 R',
        '896 S', '147 L', '799 L', '203 C',
        '83 C',  '379 R',  '465 C', '771 L',
        '531 L', '1 R',    '882 L', '788 S',
        '539 S', '140 P',  '489 L', '232 R',
        '666 S', '543 R',  '890 P', '469 R',
        '915 L', '456 S',  '127 R', '247 S',
        '486 S', '1022 R', '644 L', '622 R',
        '908 L', '76 S',   '496 L', '603 L',
        '816 C', '511 R',  '777 S', '259 R',
        '694 C', '63 S',   '230 L', '977 P',
        '906 C', '1007 L', '367 R', '966 S',
        '641 R', '431 R',  '287 S', '886 S',
        '519 P', '515 C',  '680 P', '427 R',
        '345 R', '73 L',   '8 L',   '257 S',
        '716 R', '296 L',  '892 S', '934 R',
        '236 S', '684 R',  '624 L', '804 R',
        '129 R', '940 L',  '897 R', '776 S',
        '11 S',  '248 S', '272 C', '264 C',
        '289 C', '497 R', '66 C',  '468 C',
        '973 R', '509 C', '990 P', '291 C',
        '429 L', '9 P',   '568 P', '357 P',
        '154 S', '516 S', '163 S', '395 C',
        '723 L', '517 C', '660 R', '838 S',
        '542 L', '574 C', '404 R', '939 C',
        '959 R', '18 S',  '433 R', '930 L',
        '844 P', '267 R', '834 R', '337 S',
        '719 R', '85 S',  '925 P', '387 P',
        '492 S', '588 S', '846 R', '513 L',
        '630 S', '484 L', '33 P',  '302 C',
        '775 S', '7 R',   '282 R', '449 P',
        '98 R',  '414 R', '824 C', '306 S',
        '227 C', '116 C', '369 L', '394 P',
        '458 R', '634 C', '29 S',  '780 R',
        '899 S', '975 S', '141 R', '962 C',
        '436 P', '737 R', '158 P', '715 P',
        '422 P', '861 L', '721 C', '238 S',
        '708 R', '778 P', '789 S', '535 C',
        '28 S',  '27 S',  '377 S', '514 C',
        '454 L', '226 S', '494 S', '720 L',
        '53 L',  '811 L', '590 R', '884 C',
        '526 S', '745 R', '790 L', '269 R',
        '704 S',  '1018 L', '251 C', '518 S',
        '493 S',  '305 P',  '764 S', '889 C',
        '1013 C', '451 R',  '598 S', '529 S',
        '19 P',   '171 P',  '552 L', '784 R',
        '319 S',  '474 P',  '506 C', '829 L',
        '998 P',  '396 P',  '239 C', '1014 P',
        '954 L',  '801 P',  '274 R', '921 R',
        '926 R',  '61 P',   '809 S', '700 C',
        '243 R', '979 C',  '1024 C', '593 L',
        '2 S',   '1006 C', '80 S',   '652 C',
        '288 S', '633 R',  '425 S',  '867 P',
        '244 P', '452 R',  '699 L',  '178 L',
        '90 P',  '144 L',  '476 C',  '970 S',
        '194 S', '3 L',    '963 C',  '205 S',
        '570 C', '353 R',  '224 S',  '672 R',
        '461 L', '510 L',  '1020 S', '368 S',
        '629 R', '285 S', '1001 S', '991 P',
        '845 L', '150 L', '196 L',  '999 P',
        '739 S', '105 S', '331 R',  '214 R',
        '96 C',  '20 P',  '261 P',  '527 R',
        '228 R', '628 L', '1012 S', '1023 L',
        '695 C', '865 R', '989 C',  '610 P',
        '936 C', '681 P', '6 R',    '676 P',
        '290 S', '525 L', '692 R',  '988 C',
        '313 L', '152 L',  '595 S', '393 L',
        '52 L',  '1010 R', '758 S', '135 C',
        '419 S', '321 C',  '355 R', '31 P',
        '354 L', '874 S',  '195 L', '616 R',
        '4 R',   '702 C',  '161 P', '981 P',
        '222 P', '839 R',  '796 P', '841 R',
        '691 P', '650 S',  '109 P', '86 P',
        '554 P', '923 S',  '21 S',  '485 R',
        '237 P', '812 S', '806 R', '1015 P',
        '478 S', '256 S', '283 L', '736 S',
        '447 C', '826 R', '344 P', '946 R',
        '58 P',  '668 P', '757 S', '56 S',
        '75 L',  '823 R', '528 L', '632 L',
        '48 L',  '894 L', '69 S',  '609 R',
        '133 P', '284 R', '420 L', '229 C',
        '805 L', '262 R', '34 R',  '45 L',
        '126 P',  '423 S', '12 C',  '263 R',
        '46 L',   '249 S', '967 L', '587 S',
        '309 R',  '941 S', '912 S', '729 C',
        '1019 C', '618 P', '120 R', '174 S',
        '24 C',   '336 C', '919 P', '822 L',
        '521 L',  '107 S', '558 S', '277 R',
        '948 C',  '326 R', '786 C', '825 S',
        '914 R',  '755 C', '301 S', '365 P',
        '390 S',  '470 P', '342 S',  '185 C',
        '505 S',  '601 S', '615 C',  '223 S',
        '728 S',  '983 L', '984 C',  '996 R',
        '134 P',  '933 L', '36 P',   '192 P',
        '654 L',  '965 S', '605 P',  '41 C',
        '340 S',  '117 S', '328 P',  '113 S',
        '30 C',   '831 L', '1016 L', '240 L',
        '1017 P', '643 C', '562 L',  '734 L',
      ],
    },
    output: "34 45 262 229 823 283 152 24 228 230 188",
  },
];

const failureCases = [
  {
    input: {
      N: 1,
      playerSigns: ["4 R", "1 P", "8 P", "3 R", "7 C", "5 S", "6 L", "2 L"],
    },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    input: {
      N: 12,
      playerSigns: ["4 R", "1 P", "8 P", "3 R", "7 C", "5 S", "6 L", "2 L"],
    },
    error: ErrorEnum.INVALID_N,
  },
  {
    input: {
      N: 16,
      playerSigns: ["4 R", "1 P", "8 P", "3 R", "7 C", "5 S", "6 L", "2 L"],
    },
    error: ErrorEnum.INVALID_PLAYER_SIGNS,
  },
  {
    input: {
      N: 8,
      playerSigns: ["$ R", "1 P", "8 P", "3 R", "7 C", "5 S", "6 L", "2 L"],
    },
    error: ErrorEnum.INVALID_PLAYER_SIGNS,
  },
  {
    input: {
      N: 8,
      playerSigns: ["-4 R", "1 P", "8 P", "3 R", "7 C", "5 S", "6 L", "2 L"],
    },
    error: ErrorEnum.INVALID_PLAYER_SIGNS,
  },
  {
    input: {
      N: 8,
      playerSigns: ["4 X", "1 P", "8 P", "3 R", "7 C", "5 S", "6 L", "2 L"],
    },
    error: ErrorEnum.INVALID_PLAYER_SIGNS,
  },
  {
    input: {
      N: 8,
      playerSigns: ["4 R", "4 P", "8 P", "3 R", "7 C", "5 S", "6 L", "2 L"],
    },
    error: ErrorEnum.INVALID_PLAYER_SIGNS,
  },
];

describe("test challenge 008", () => {
  it.each(successCases)(
    // "test sumAll($input) should result $output",
    "returns '$output' when N = '$input.N' and playerSigns = '$input.playerSigns'",
    ({ input, output }) => {
      const { N, playerSigns } = input;

      expect(solution(N, playerSigns)).toBe(output);
    }
  );

  it.each(failureCases)(
    // "test sumAll($input) should result $output",
    "throws an error '$error' when N = '$input.N' and playerSigns = '$input.playerSigns'",
    ({ input, error }) => {
      const { N, playerSigns } = input;

      expect(() => solution(N, playerSigns)).toThrow(error);
    }
  );
});
