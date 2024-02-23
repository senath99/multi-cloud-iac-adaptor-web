import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCubeQuery } from '@cubejs-client/react';
import { cloneDeep } from 'lodash';
// material
import { Box, CircularProgress, Typography } from '@material-ui/core';
// components
import EmptyContent from '../../../EmptyContent';
import { AnalyticsPercentageRadial } from '../components/analytics/AnalyticsPercentageRadial';
//charts
import {
  BarChart,
  PieChart,
  Number,
  ProgressRadial,
  DonutChart
} from '../components/analytics/Report/charts';
// utils
import { del } from '../../../../utils/del';
// function

import {
  convertToLineChartData,
  convertToPieChartData,
  convertToProgressChartData,
  convertToTimeSeriesData,
  getSeriesData
} from '../components/analytics/Report/ChartUtilities';
import { checkUndefinedOrNull } from '../../../../utils/functions';
// ----------------------------------------------------------------------

SummaryRenderer.propTypes = {
  element: PropTypes.object,
  chartType: PropTypes.string,
  charttTitle: PropTypes.string,
  chartHeight: PropTypes.number,
  chartDescriptionEnabled: PropTypes.bool
};

export default function SummaryRenderer({
  chartType,
  chartTitle,
  element,
  acceptedFilters = {},
  chartHeight,
  chartDescriptionEnabled
}) {
  const [data, setData] = useState([]);
  const [responses, setResponses] = useState([]);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [chartQuery, setChartQuery] = useState({});
  const [cubeQuery, setCubeQuery] = useState([]);
  const isPredefinedDataPresent = element.data?.length > 0;
  const getCubeQuery = () => {
    return isPredefinedDataPresent ? [{}, {}] : cubeQuery;
  };

  const { resultSet, isLoading, error } = useCubeQuery(getCubeQuery(), {
    skip: isPredefinedDataPresent || cubeQuery.length === 0
  });

  const queryDimensions = element.query?.dimensions;
  let dimensionValues = [];
  if (!checkUndefinedOrNull(queryDimensions)) {
    dimensionValues = queryDimensions;
  }

  const { parse } = resultSet
    ? del(resultSet.loadResponses)
    : element.data
    ? del([{ data: data, query: element.query }])
    : { parse: null };

  const trendValue = parse('${trend()}');

  useEffect(() => {
    let finalQuery = cloneDeep(element.query);

    setIsChartLoading(true);
    setChartQuery(finalQuery);
    setCubeQuery(finalQuery);
    if (!isLoading && element.data.length == 0 && resultSet?.loadResponses) {
      setData(resultSet.loadResponses[0].data);
      setResponses(resultSet.loadResponses);
      setIsChartLoading(false);
    } else if (element.data.length > 0) {
      setData(element.data);
      setResponses([{ data: element.data }]);
      setIsChartLoading(false);
    }
  }, [isLoading, acceptedFilters, element]);

  const getChart = () => {
    const commonProps = { chartHeight: chartHeight, type: element.unitType };

    switch (chartType) {
      case 'pie':
        return (
          <PieChart
            {...commonProps}
            data={convertToPieChartData(data, dimensionValues, element)}
            enableMonoChromeColors={element?.monoChromeColors}
            showLegend={element?.showLegend}
            showAsPercent={element.showAsPercent}
            colorPalette={element?.colorPalette}
            monoChromeBaseColor={element?.monoChromeBaseColor}
            tooltipsEnabled={element?.tooltipsEnabled}
            showAsDonut={element?.showAsDonut}
            fontSize={element?.fontSize}
            paddingOverrides={element?.paddingOverrides}
          />
        );
      case 'donut':
        return (
          <DonutChart
            {...commonProps}
            data={convertToPieChartData(data, dimensionValues, element)}
            showLegend={element?.showLegend}
            showAsPie={element?.showAsPie}
            centeredTitle={element?.centeredTitle}
            fontSize={element?.fontSize}
            showTitle={element?.showTitle}
            colorScheme={element?.colorScheme}
            borderRadius={element?.borderRadius}
            unit={element?.unit}
          />
        );
      case 'bar':
        return (
          <BarChart
            {...commonProps}
            data={
              element.query.timeDimensions &&
              element.query.timeDimensions[0]?.granularity
                ? convertToTimeSeriesData(
                    data,
                    chartQuery,
                    dimensionValues,
                    element
                  )
                : convertToLineChartData(element, dimensionValues, responses)
            }
            stacked={element.stacked ? element.stacked : false}
            hideXAxis={element.hideXAxis ? element.hideXAxis : false}
            hideYAxis={element.hideYAxis ? element.hideYAxis : false}
            showDataLabels={
              element.showDataLabels ? element.showDataLabels : false
            }
            showLegend={element?.showLegend}
            paddingOverrides={element?.paddingOverrides}
            barWidth={element?.barWidth}
            colorPalette={element?.colorPalette}
            enableMonoChromeColors={element?.monoChromeColors}
            fontSize={element?.fontSize}
            monoChromeBaseColor={element?.monoChromeBaseColor}
            tooltipsEnabled={element?.tooltipsEnabled}
            skewLabels={element?.skewLabels}
            unit={element?.unit}
            dataLabelsInside={element?.dataLabelsInside}
          />
        );
      case 'progressRadial':
        return (
          <ProgressRadial
            {...commonProps}
            data={convertToProgressChartData(data, dimensionValues, element)}
            showFractionAsLabel={element.showFractionAsLabel}
            sortByLabel={element.sortByLabel}
            showRAGColors={element.showRAGColors}
            recordsToShow={element.recordsToShow}
            fontSize={element?.fontSize}
          />
        );
      case 'number':
        return (
          <Number
            {...commonProps}
            data={convertToPieChartData(data, dimensionValues, element)}
            trendValue={trendValue}
            trendEnabled={element?.trendEnabled}
            inverted={element?.inverted}
            enableRoundoff={element?.enableRoundoff}
            type={element?.unitType}
            shortDescription={element?.shortDescription}
          />
        );
      case 'percentageRadial':
        return (
          <AnalyticsPercentageRadial
            data={{
              labels: [],
              series: getSeriesData(element, dimensionValues, responses),
              totalLabel: element?.shortDescription
            }}
            radialSize={element?.radialSize}
            height={element?.chartHeight}
            fontSize={element?.fontSize}
            valueFontSize={element?.valueFontSize}
            shortDescription={element?.shortDescription}
            paddingOverrides={element?.paddingOverrides}
            colorPalette={element?.colorPalette}
            enableRAG={element?.enableRAG}
          />
        );
      default:
        return (
          <EmptyContent
            description={'We are unable to retrieve chart data at the moment.'}
          />
        );
    }
  };

  return (
    <Box>
      {error ? (
        <EmptyContent
          description={'We are unable to retrieve chart data at the moment.'}
        />
      ) : !error && isChartLoading ? (
        <Box
          sx={{
            width: '100%',
            height: 240,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {element?.titleEnabled && (
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography textAlign={'center'} variant="h6" noWrap>
                {element.title}
              </Typography>
            </Box>
          )}
          <Box sx={{ height: 240 }}>{getChart()}</Box>
        </Box>
      )}
    </Box>
  );
}
