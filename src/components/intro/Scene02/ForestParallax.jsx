export default function ForestParallax({ progress }) { return <div className="forest-parallax" style={{ '--shift': `${(progress - .5) * 36}px` }} aria-hidden="true"><i /><i /><i /></div> }
