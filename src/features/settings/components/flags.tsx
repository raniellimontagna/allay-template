import Svg, { Circle, G, Mask, Path, Rect } from 'react-native-svg';

export const USFlag = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 90 90" fill="none">
    <Circle cx="44" cy="45" r="40" fill="#F2F0F2" />
    <Mask
      id="mask0_2_248"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="4"
      y="5"
      width="80"
      height="80"
    >
      <Circle cx="44" cy="45" r="40" fill="#FCFCFC" />
    </Mask>
    <G mask="url(#mask0_2_248)">
      <Rect x="17" y="76" width="55" height="10" fill="#D90026" />
      <Rect x="17" y="76" width="55" height="10" fill="#D90026" />
      <Rect x="5" y="56" width="79" height="10" fill="#D90026" />
      <Rect x="5" y="56" width="79" height="10" fill="#D90026" />
      <Rect x="5" y="35" width="79" height="10" fill="#D90026" />
      <Rect x="5" y="35" width="79" height="10" fill="#D90026" />
      <Rect x="5" y="15" width="79" height="10" fill="#D90026" />
      <Rect x="5" y="15" width="79" height="10" fill="#D90026" />
      <Rect x="4" y="5" width="41" height="40" fill="#0052B5" />
      <Path
        d="M37 38.5L34 40L35 37L33 35H36L37 32L38.5 35H41L39 37L40 40L37 38.5Z"
        fill="#EFEFEF"
      />
      <Path
        d="M23 38.5L20 40L21 37L19 35H22L23 32L24.5 35H27L25 37L26 40L23 38.5Z"
        fill="#EFEFEF"
      />
      <Path d="M9 38.5L6 40L7 37L5 35H8L9 32L10.5 35H13L11 37L12 40L9 38.5Z" fill="#EFEFEF" />
      <Path
        d="M37 27.5L34 29L35 26L33 24H36L37 21L38.5 24H41L39 26L40 29L37 27.5Z"
        fill="#EFEFEF"
      />
      <Path
        d="M37 16.5L34 18L35 15L33 13H36L37 10L38.5 13H41L39 15L40 18L37 16.5Z"
        fill="#EFEFEF"
      />
      <Path d="M37 5.5L34 7L35 4L33 2H36L37 -1L38.5 2H41L39 4L40 7L37 5.5Z" fill="#EFEFEF" />
      <Path
        d="M23 16.5L20 18L21 15L19 13H22L23 10L24.5 13H27L25 15L26 18L23 16.5Z"
        fill="#EFEFEF"
      />
      <Path
        d="M23 27.5L20 29L21 26L19 24H22L23 21L24.5 24H27L25 26L26 29L23 27.5Z"
        fill="#EFEFEF"
      />
      <Path d="M9 27.5L6 29L7 26L5 24H8L9 21L10.5 24H13L11 26L12 29L9 27.5Z" fill="#EFEFEF" />
    </G>
  </Svg>
);

export const BRFlag = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 90 90" fill="none">
    <Path
      d="M84 45C84 67.0914 66.0914 85 44 85C21.9086 85 4 67.0914 4 45C4 22.9086 21.9086 5 44 5C66.0914 5 84 22.9086 84 45Z"
      fill="#6EA644"
    />
    <Path d="M45 21L78 45L45 69L12 45L45 21Z" fill="#FFDB44" />
    <Path
      d="M59 45C59 52.732 52.732 59 45 59C37.268 59 31 52.732 31 45C31 37.268 37.268 31 45 31C52.732 31 59 37.268 59 45Z"
      fill="#0051B5"
    />
    <Path
      d="M32.3473 39C31.4834 40.8185 31 42.8528 31 45C45.4 42.6 53.7501 49.6667 56.1252 53.5C57.5455 51.6439 58.5118 49.4219 58.8582 47C50.8582 39 37.8509 38.3333 32.3473 39Z"
      fill="white"
    />
  </Svg>
);

export const ESFlag = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 90 90" fill="none">
    <Path
      d="M44 85C21.9086 85 4 67.0914 4 45C4 22.9086 21.9086 5 44 5C66.0914 5 84 22.9086 84 45C84 67.0914 66.0914 85 44 85Z"
      fill="#FFDB44"
    />
    <Path
      d="M81.4816 31C75.8066 15.8133 61.1661 5 44 5C26.8339 5 12.1934 15.8133 6.51843 31L81.4816 31Z"
      fill="#D90026"
    />
    <Path
      d="M6.51843 59C12.1934 74.1867 26.8339 85 44 85C61.1661 85 75.8066 74.1867 81.4816 59L6.51843 59Z"
      fill="#D90026"
    />
  </Svg>
);
