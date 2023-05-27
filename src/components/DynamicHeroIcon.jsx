// DynamicHeroIcon.jsx
// Simple Dynamic HeroIcons Component for React (javascript / jsx)
// by: Mike Summerfeldt (IT-MikeS - https://github.com/IT-MikeS)

import * as HIcons from '@heroicons/react/24/solid';

function DynamicHeroIcon(props) {
  const { ...icons } = HIcons;

  // eslint-disable-next-line react/destructuring-assignment, react/prop-types
  const HIcon = icons[props.icon];
  // eslint-disable-next-line react/destructuring-assignment, react/prop-types
  const className = props.iconstyles;

  return <HIcon className={className} aria-hidden="true" />;
}

export default DynamicHeroIcon;