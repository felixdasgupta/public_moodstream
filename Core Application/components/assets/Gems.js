import { GemSvg } from "../styled/Mood";

export const GemPeace = props => (
  <GemSvg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="99"
    height="114"
    viewBox="0 0 99 114"
    {...props}
  >
    <defs>
      <linearGradient
        id="linearGradient-focus-1"
        x1="50%"
        x2="50%"
        y1="2.698%"
        y2="100.39%"
      >
        <stop offset="0%" stopColor="#21D4FD"></stop>
        <stop offset="100%" stopColor="#1436DE"></stop>
      </linearGradient>
      <path
        id="path-focus-2"
        d="M42 1.443l34.404 19.864a5 5 0 012.5 4.33v39.726a5 5 0 01-2.5 4.33L42 89.557a5 5 0 01-5 0L2.596 69.693a5 5 0 01-2.5-4.33V25.637a5 5 0 012.5-4.33L37 1.443a5 5 0 015 0z"
      ></path>
      <linearGradient
        id="linearGradient-focus-4"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#C7C7C7"></stop>
        <stop offset="100%" stopColor="#FFF"></stop>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g>
        <path
          fill="url(#linearGradient-focus-1)"
          d="M51.863 1.443l44.364 25.614a5 5 0 012.5 4.33v51.226a5 5 0 01-2.5 4.33l-44.364 25.614a5 5 0 01-5 0L2.5 86.943a5 5 0 01-2.5-4.33V31.387a5 5 0 012.5-4.33L46.863 1.443a5 5 0 015 0z"
          opacity="0.3"
        ></path>
        <g strokeWidth="1" transform="translate(10 12)">
          <mask id="mask-focus-3" fill="#fff">
            <use xlinkHref="#path-focus-2"></use>
          </mask>
          <use
            fill="url(#linearGradient-focus-1)"
            xlinkHref="#path-focus-2"
          ></use>
          <path
            fill="url(#linearGradient-focus-4)"
            opacity="0.298"
            style={{ mixBlendMode: "overlay" }}
            d="M39.5 46L78.9041559 68.75 78.9041559 114.25 39.5 137 0.0958441278 114.25 0.0958441278 68.75z"
            mask="url(#mask-focus-3)"
          ></path>
        </g>
      </g>
    </g>
  </GemSvg>
);

export const GemRage = props => (
  <GemSvg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="99"
    height="114"
    viewBox="0 0 99 114"
    {...props}
  >
    <defs>
      <linearGradient
        id="linearGradient-power-1"
        x1="50%"
        x2="50%"
        y1="97.911%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#FF0844"></stop>
        <stop offset="100%" stopColor="#FFB199"></stop>
      </linearGradient>
      <path
        id="path-power-2"
        d="M51.863 1.443l44.364 25.614a5 5 0 012.5 4.33v51.226a5 5 0 01-2.5 4.33l-44.364 25.614a5 5 0 01-5 0L2.5 86.943a5 5 0 01-2.5-4.33V31.387a5 5 0 012.5-4.33L46.863 1.443a5 5 0 015 0z"
      ></path>
      <filter
        width="262.1%"
        height="239%"
        x="-81%"
        y="-34.4%"
        filterUnits="objectBoundingBox"
      >
        <feOffset
          dy="40"
          in="SourceAlpha"
          result="shadowOffsetOuter1"
        ></feOffset>
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="20"
        ></feGaussianBlur>
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        ></feColorMatrix>
      </filter>
      <path
        id="path-power-4"
        d="M42.5 1.732l33.404 19.286a6 6 0 013 5.196v38.572a6 6 0 01-3 5.196L42.5 89.268a6 6 0 01-6 0L3.096 69.982a6 6 0 01-3-5.196V26.214a6 6 0 013-5.196L36.5 1.732a6 6 0 016 0z"
      ></path>
      <linearGradient
        id="linearGradient-power-6"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#C7C7C7"></stop>
        <stop offset="100%" stopColor="#FFF"></stop>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g>
        <g>
          <use
            fill="url(#linearGradient-power-1)"
            opacity="0.302"
            xlinkHref="#path-power-2"
          ></use>
          <g fillRule="evenodd" strokeWidth="1" transform="translate(10 12)">
            <mask id="mask-power-5" fill="#fff">
              <use xlinkHref="#path-power-4"></use>
            </mask>
            <use
              fill="url(#linearGradient-power-1)"
              xlinkHref="#path-power-4"
            ></use>
            <path
              fill="url(#linearGradient-power-6)"
              opacity="0.298"
              style={{ mixBlendMode: "overlay" }}
              d="M39.5 46L78.9041559 68.75 78.9041559 114.25 39.5 137 0.0958441278 114.25 0.0958441278 68.75z"
              mask="url(#mask-power-5)"
            ></path>
          </g>
        </g>
      </g>
    </g>
  </GemSvg>
);

export const GemLust = props => (
  <GemSvg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="99"
    height="114"
    viewBox="0 0 99 114"
    {...props}
  >
    <defs>
      <linearGradient
        id="linearGradient-compassion-1"
        x1="50%"
        x2="50%"
        y1="0%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#9E1AD6"></stop>
        <stop offset="100%" stopColor="#494DC9"></stop>
      </linearGradient>
      <path
        id="path-compassion-2"
        d="M42 1.443l34.404 19.864a5 5 0 012.5 4.33v39.726a5 5 0 01-2.5 4.33L42 89.557a5 5 0 01-5 0L2.596 69.693a5 5 0 01-2.5-4.33V25.637a5 5 0 012.5-4.33L37 1.443a5 5 0 015 0z"
      ></path>
      <linearGradient
        id="linearGradient-compassion-4"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#C7C7C7"></stop>
        <stop offset="100%" stopColor="#FFF"></stop>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g>
        <path
          fill="url(#linearGradient-compassion-1)"
          d="M51.863 1.443l44.364 25.614a5 5 0 012.5 4.33v51.226a5 5 0 01-2.5 4.33l-44.364 25.614a5 5 0 01-5 0L2.5 86.943a5 5 0 01-2.5-4.33V31.387a5 5 0 012.5-4.33L46.863 1.443a5 5 0 015 0z"
          opacity="0.3"
        ></path>
        <g strokeWidth="1" transform="translate(10 12)">
          <mask id="mask-compassion-3" fill="#fff">
            <use xlinkHref="#path-compassion-2"></use>
          </mask>
          <use
            fill="url(#linearGradient-compassion-1)"
            xlinkHref="#path-compassion-2"
          ></use>
          <path
            fill="url(#linearGradient-compassion-4)"
            opacity="0.298"
            style={{ mixBlendMode: "overlay" }}
            d="M39.5 46L78.9041559 68.75 78.9041559 114.25 39.5 137 0.0958441278 114.25 0.0958441278 68.75z"
            mask="url(#mask-compassion-3)"
          ></path>
        </g>
      </g>
    </g>
  </GemSvg>
);

export const GemLove = props => (
  <GemSvg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="99"
    height="114"
    viewBox="0 0 99 114"
    {...props}
  >
    <defs>
      <linearGradient
        id="linearGradient-love-1"
        x1="50%"
        x2="50%"
        y1="115.7%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#7742B2"></stop>
        <stop offset="100%" stopColor="#F5A6FF"></stop>
      </linearGradient>
      <path
        id="path-love-2"
        d="M42 1.443l34.404 19.864a5 5 0 012.5 4.33v39.726a5 5 0 01-2.5 4.33L42 89.557a5 5 0 01-5 0L2.596 69.693a5 5 0 01-2.5-4.33V25.637a5 5 0 012.5-4.33L37 1.443a5 5 0 015 0z"
      ></path>
      <linearGradient
        id="linearGradient-love-4"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#C7C7C7"></stop>
        <stop offset="100%" stopColor="#FFF"></stop>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g>
        <path
          fill="url(#linearGradient-love-1)"
          d="M51.863 1.443l44.364 25.614a5 5 0 012.5 4.33v51.226a5 5 0 01-2.5 4.33l-44.364 25.614a5 5 0 01-5 0L2.5 86.943a5 5 0 01-2.5-4.33V31.387a5 5 0 012.5-4.33L46.863 1.443a5 5 0 015 0z"
          opacity="0.3"
        ></path>
        <g strokeWidth="1" transform="translate(10 12)">
          <mask id="mask-love-3" fill="#fff">
            <use xlinkHref="#path-love-2"></use>
          </mask>
          <use
            fill="url(#linearGradient-love-1)"
            xlinkHref="#path-love-2"
          ></use>
          <path
            fill="url(#linearGradient-love-4)"
            opacity="0.298"
            style={{ mixBlendMode: "overlay" }}
            d="M39.5 46L78.9041559 68.75 78.9041559 114.25 39.5 137 0.0958441278 114.25 0.0958441278 68.75z"
            mask="url(#mask-love-3)"
          ></path>
        </g>
      </g>
    </g>
  </GemSvg>
);

export const GemFear = props => (
  <GemSvg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="99"
    height="114"
    viewBox="0 0 99 114"
    {...props}
  >
    <defs>
      <linearGradient
        id="linearGradient-fear-1"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#D1913C"></stop>
        <stop offset="100%" stopColor="#FFEF94"></stop>
      </linearGradient>
      <path
        id="path-fear-2"
        d="M42 1.443l34.404 19.864a5 5 0 012.5 4.33v39.726a5 5 0 01-2.5 4.33L42 89.557a5 5 0 01-5 0L2.596 69.693a5 5 0 01-2.5-4.33V25.637a5 5 0 012.5-4.33L37 1.443a5 5 0 015 0z"
      ></path>
      <linearGradient
        id="linearGradient-fear-4"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#C7C7C7"></stop>
        <stop offset="100%" stopColor="#FFF"></stop>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g>
        <path
          fill="url(#linearGradient-fear-1)"
          d="M51.863 1.443l44.364 25.614a5 5 0 012.5 4.33v51.226a5 5 0 01-2.5 4.33l-44.364 25.614a5 5 0 01-5 0L2.5 86.943a5 5 0 01-2.5-4.33V31.387a5 5 0 012.5-4.33L46.863 1.443a5 5 0 015 0z"
          opacity="0.3"
        ></path>
        <g strokeWidth="1" transform="translate(10 12)">
          <mask id="mask-fear-3" fill="#fff">
            <use xlinkHref="#path-fear-2"></use>
          </mask>
          <use
            fill="url(#linearGradient-fear-1)"
            xlinkHref="#path-fear-2"
          ></use>
          <path
            fill="url(#linearGradient-fear-4)"
            opacity="0.298"
            style={{ mixBlendMode: "overlay" }}
            d="M39.5 46L78.9041559 68.75 78.9041559 114.25 39.5 137 0.0958441278 114.25 0.0958441278 68.75z"
            mask="url(#mask-fear-3)"
          ></path>
        </g>
      </g>
    </g>
  </GemSvg>
);

export const GemEgo = props => (
  <GemSvg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="99"
    height="114"
    viewBox="0 0 99 114"
    {...props}
  >
    <defs>
      <linearGradient
        id="linearGradient-greed-1"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#FC6076"></stop>
        <stop offset="100%" stopColor="#FFC745"></stop>
      </linearGradient>
      <path
        id="path-greed-2"
        d="M41.904 1.443l34.404 19.864a5 5 0 012.5 4.33v39.726a5 5 0 01-2.5 4.33L41.904 89.557a5 5 0 01-5 0L2.5 69.693a5 5 0 01-2.5-4.33V25.637a5 5 0 012.5-4.33L36.904 1.443a5 5 0 015 0z"
      ></path>
      <linearGradient
        id="linearGradient-greed-4"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#C7C7C7"></stop>
        <stop offset="100%" stopColor="#FFF"></stop>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g>
        <path
          fill="url(#linearGradient-greed-1)"
          d="M51.863 1.443l44.364 25.614a5 5 0 012.5 4.33v51.226a5 5 0 01-2.5 4.33l-44.364 25.614a5 5 0 01-5 0L2.5 86.943a5 5 0 01-2.5-4.33V31.387a5 5 0 012.5-4.33L46.863 1.443a5 5 0 015 0z"
          opacity="0.3"
        ></path>
        <g strokeWidth="1" transform="translate(10 12)">
          <mask id="mask-greed-3" fill="#fff">
            <use xlinkHref="#path-greed-2"></use>
          </mask>
          <use
            fill="url(#linearGradient-greed-1)"
            xlinkHref="#path-greed-2"
          ></use>
          <path
            fill="url(#linearGradient-greed-4)"
            opacity="0.298"
            style={{ mixBlendMode: "overlay" }}
            d="M39.5 45L78.9041559 67.75 78.9041559 113.25 39.5 136 0.0958441278 113.25 0.0958441278 67.75z"
            mask="url(#mask-greed-3)"
          ></path>
        </g>
      </g>
    </g>
  </GemSvg>
);

export const GemBliss = props => (
  <GemSvg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="99"
    height="114"
    viewBox="0 0 99 114"
    {...props}
  >
    <defs>
      <linearGradient
        id="linearGradient-willpower-1"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="1.95%"
      >
        <stop offset="0%" stopColor="#0BA360"></stop>
        <stop offset="100%" stopColor="#3CBA92"></stop>
      </linearGradient>
      <linearGradient
        id="linearGradient-willpower-2"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="1.95%"
      >
        <stop offset="0%" stopColor="#0A8A52"></stop>
        <stop offset="100%" stopColor="#4BEBB8"></stop>
      </linearGradient>
      <path
        id="path-willpower-3"
        d="M42 1.443l34.404 19.864a5 5 0 012.5 4.33v39.726a5 5 0 01-2.5 4.33L42 89.557a5 5 0 01-5 0L2.596 69.693a5 5 0 01-2.5-4.33V25.637a5 5 0 012.5-4.33L37 1.443a5 5 0 015 0z"
      ></path>
      <linearGradient
        id="linearGradient-willpower-5"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#C7C7C7"></stop>
        <stop offset="100%" stopColor="#FFF"></stop>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g>
        <path
          fill="url(#linearGradient-willpower-1)"
          d="M51.863 1.443l44.364 25.614a5 5 0 012.5 4.33v51.226a5 5 0 01-2.5 4.33l-44.364 25.614a5 5 0 01-5 0L2.5 86.943a5 5 0 01-2.5-4.33V31.387a5 5 0 012.5-4.33L46.863 1.443a5 5 0 015 0z"
          opacity="0.3"
        ></path>
        <g strokeWidth="1" transform="translate(10 12)">
          <mask id="mask-willpower-4" fill="#fff">
            <use xlinkHref="#path-willpower-3"></use>
          </mask>
          <use
            fill="url(#linearGradient-willpower-2)"
            xlinkHref="#path-willpower-3"
          ></use>
          <path
            fill="url(#linearGradient-willpower-5)"
            opacity="0.298"
            style={{ mixBlendMode: "overlay" }}
            d="M39.5 46L78.9041559 68.75 78.9041559 114.25 39.5 137 0.0958441278 114.25 0.0958441278 68.75z"
            mask="url(#mask-willpower-4)"
          ></path>
        </g>
      </g>
    </g>
  </GemSvg>
);
