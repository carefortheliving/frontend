import React, { createRef, Fragment, PureComponent } from 'react';
import { FixedSizeList, FixedSizeGrid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import useBreakpoint from 'src/hooks/useBreakpoint';


let listOptions = ['first cell', 'second cell', 'third cell', 'fourth cell'];
listOptions = [...listOptions, ...listOptions, ...listOptions];

const Row = (props: {
  index,
  style,
}) => {
  const { index, style } = props;
  return (
    <div className="ListItem" style={style}>
      {'The cell: ' + index}
    </div>
  );
};

const Cell = ({ columnIndex, rowIndex, style, isScrolling }) => {
  const option = listOptions?.[rowIndex];
  return (
    <div style={{
      cursor: 'pointer',
      ...style,
    }}>
      {option || 'Loading...'}
    </div>
  );
};

const loadMoreItems = async (startIndex, stopIndex) => {
  console.log('Loading more...');
  console.log({ startIndex, stopIndex });
};

const InfiniteGrid = () => {
  const isUpSm = useBreakpoint('sm');
  const listHeight = 200;
  const rowHeight = 50;
  const itemsCount = 50; // listOptions?.length;
  const columnCount = isUpSm ? 3 : 1;
  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={(rowIndex) => {
          return !!(listOptions?.[rowIndex]);
        }}
        itemCount={itemsCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          // <FixedSizeList
          //   className="List"
          //   height={150}
          //   itemCount={listOptions?.length}
          //   itemSize={30}
          //   onItemsRendered={onItemsRendered}
          //   ref={ref}
          //   width={300}
          // >
          //   {Row}
          // </FixedSizeList>
          <FixedSizeGrid
            // outerRef={ref}
            // innerRef={ref}
            // onItemsRendered={onItemsRendered}
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
            height={listHeight}
            rowCount={itemsCount}
            rowHeight={rowHeight}
            columnCount={columnCount}
            columnWidth={400}
            width={isUpSm ? 1200 : 400}
            // onScroll={handleListScroll}
          >
            {Cell}
          </FixedSizeGrid>
        )}
      </InfiniteLoader>
    </Fragment>
  );
};

export default InfiniteGrid;
