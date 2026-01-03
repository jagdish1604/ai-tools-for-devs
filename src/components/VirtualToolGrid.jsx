import { FixedSizeGrid as Grid } from "react-window";
import ToolCard from "./ToolCard";
import { useMemo } from "react";

export default function VirtualToolGrid({
  tools,
  favorites,
  onToggleFavorite
}) {
  const columnCount = 3;

  const rowCount = Math.ceil(tools.length / columnCount);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (!tools[index]) return null;

    return (
      <div style={style} className="p-3">
        <ToolCard
          tool={tools[index]}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <Grid
        columnCount={columnCount}
        columnWidth={360}
        height={900}
        rowCount={rowCount}
        rowHeight={280}
        width={columnCount * 360}
      >
        {Cell}
      </Grid>
    </div>
  );
}
