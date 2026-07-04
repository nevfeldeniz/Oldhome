import { ALL_ROOM_FEATURE_OPTIONS, BASE_ROOM_FEATURES } from '../../utils/roomFeatures'

export default function FeatureChecklist({ selected = [], onChange }) {
  const toggle = (feature) => {
    if (selected.includes(feature)) {
      onChange(selected.filter((f) => f !== feature))
    } else {
      onChange([...selected, feature])
    }
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {ALL_ROOM_FEATURE_OPTIONS.map((feature) => {
        const isBase = BASE_ROOM_FEATURES.includes(feature)
        return (
          <label
            key={feature}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-wine/10 bg-cream px-3 py-2.5 text-sm transition hover:border-wine/25"
          >
            <input
              type="checkbox"
              checked={selected.includes(feature)}
              onChange={() => toggle(feature)}
              className="accent-wine"
            />
            <span className="text-ink/80">
              {feature}
              {isBase && <span className="ml-1 text-[10px] text-ink/40">(temel)</span>}
            </span>
          </label>
        )
      })}
    </div>
  )
}
