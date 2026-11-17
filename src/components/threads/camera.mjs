/* Where the camera goes when an item is pinned: just far enough to frame it
   and its neighbours. Pure, so check-threads can pin the rules down.
   screen = world × k + (x, y), as in GraphView. Spec §5. */

/* `box` is the neighbourhood in world units, `cam` the camera now, `size`
   the stage in px. Returns the camera to move to, or null to stay put. */
export function frameCamera({ box, cam, size, fitK, maxK, margin = 80, controls = 20 }) {
  const aw = Math.max(1, size.w - 2 * margin)
  const ah = Math.max(1, size.h - controls - 2 * margin)
  const bw = box.x1 - box.x0
  const bh = box.y1 - box.y0
  const kFit = Math.min(bw > 0 ? aw / bw : Infinity, bh > 0 ? ah / bh : Infinity)
  /* Never out past the whole-drawing fit; never absurdly far in. */
  const hi = Math.max(fitK, Math.min(maxK, fitK * 2.5))
  const target = Math.min(hi, Math.max(fitK, kFit))

  /* The box on screen now, against the stage above the controls. */
  const sx0 = box.x0 * cam.k + cam.x, sx1 = box.x1 * cam.k + cam.x
  const sy0 = box.y0 * cam.k + cam.y, sy1 = box.y1 * cam.k + cam.y
  const stageH = size.h - controls
  const inside = sx0 >= 0 && sx1 <= size.w && sy0 >= 0 && sy1 <= stageH
  const visible = sx1 > 0 && sx0 < size.w && sy1 > 0 && sy0 < stageH

  const ratio = cam.k / target
  if (inside && ratio >= 0.8 && ratio <= 1.5) return null

  const centred = k => ({
    k,
    x: size.w / 2 - ((box.x0 + box.x1) / 2) * k,
    y: stageH / 2 - ((box.y0 + box.y1) / 2) * k,
  })
  if (visible && cam.k > target) return centred(cam.k)
  return centred(target)
}
