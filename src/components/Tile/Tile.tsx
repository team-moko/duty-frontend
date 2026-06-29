"use client";

import { CheckIcon } from "../icons";
import * as styles from "./Tile.css";

interface TileProps {
  label: string;
  on: boolean;
  onClick?: () => void;
  /** 2열 그리드에서 한 줄 전폭 차지 */
  full?: boolean;
}

export function Tile({ label, on, onClick, full = false }: TileProps) {
  const stateKey = on ? "on" : "off";
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      onClick={onClick}
      className={`${styles.tile} ${styles.state[stateKey]} ${full ? styles.full : ""}`}
    >
      <span className={`${styles.box} ${styles.boxState[stateKey]}`}>
        {on && <CheckIcon />}
      </span>
      <span className={styles.label[stateKey]}>{label}</span>
    </button>
  );
}
