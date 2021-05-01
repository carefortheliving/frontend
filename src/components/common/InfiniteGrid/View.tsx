import React, { createRef, Fragment, PureComponent } from 'react';
import { FixedSizeGrid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import useBreakpoint from 'src/hooks/useBreakpoint';

export interface InfiniteGridCellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}
interface InfiniteGridProps {
  loadMoreItems: (startIndex: number, stopInex: number) => Promise<void>;
  renderCell: React.FC<InfiniteGridCellProps>;
  isItemLoaded: (rowIndex: number) => void;
  itemCount: number;
  gridHeight: number;
  rowHeight: number;
  columnCount: number;
  columnWidth: number;
}

const InfiniteGrid = (props: InfiniteGridProps) => {
  const {
    loadMoreItems,
    isItemLoaded,
    renderCell,
    itemCount,
    gridHeight,
    rowHeight,
    columnCount,
    columnWidth,
  } = props;
  const isUpSm = useBreakpoint('sm');
  // const gridHeight = 200;
  // const rowCount = round(itemCount / columnCount) + 1;
  // const rowHeight = 50;
  // const itemsCount = 50;
  // const columnCount = isUpSm ? 3 : 1;
  // const columnWidth = 300;
  const gridWidth = columnWidth * columnCount;
  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeGrid
            // outerRef={ref}
            // innerRef={ref}
            onItemsRendered={(gridProps) => {
              onItemsRendered({
                overscanStartIndex:
                  gridProps.overscanRowStartIndex * columnCount,
                overscanStopIndex: gridProps.overscanRowStopIndex * columnCount,
                visibleStartIndex: gridProps.visibleRowStartIndex * columnCount,
                visibleStopIndex: gridProps.visibleRowStopIndex * columnCount,
              });
            }}
            ref={ref}
            height={gridHeight}
            rowCount={Math.ceil(itemCount / columnCount)}
            rowHeight={rowHeight}
            columnCount={columnCount}
            columnWidth={columnWidth}
            width={gridWidth}
          // onScroll={handleListScroll}
          >
            {renderCell}
          </FixedSizeGrid>
        )}
      </InfiniteLoader>
    </Fragment>
  );
};

export default InfiniteGrid;
