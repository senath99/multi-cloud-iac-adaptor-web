import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';

import { experimentalStyled as styled } from '@material-ui/core/styles';

// components
import Scrollbar from '../Scrollbar';
import { useSnackbar } from 'notistack';
import SearchNotFound from '../SearchNotFound';
import EmptyContent from '../EmptyContent';
import LoadingScreen from '../LoadingScreen';

import { fDate } from '../../utils/formatTime';
import PropTypes from 'prop-types';
import {
  getComparator,
  applySortFilter,
  documentTypeFormater
} from '../../utils/functions';
//icons
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import DataListToolbar from './DataListToolbar';
import DataListHead from './DataListHead';
//constants
import { CHECK_BOX_FONT_SIZE, DATA_SET_DOC_TYPE } from '../../utils/constants';
import { PATH_DASHBOARD } from 'src/routes/paths';
//slices
// import { getESGDataSets } from 'src/redux/slices/data-sets';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
}));

const TABLE_HEAD = [
  { id: 'stack_name', label: 'Stack Name', alignRight: false },
  { id: 'version', label: 'version', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
];

DataList.propTypes = {
  ESGData: PropTypes.array,
  onupdateUser: PropTypes.func,
  isLoading: PropTypes.bool
};
export default function DataList({
  ESGData = [],
  isLoading,
  ondeleteDataSet,
  onEditOpen
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState({ stack_name: -1 });
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('stack_name');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredESGData = applySortFilter(
    ESGData,
    getComparator(order, orderBy),
    filterName,
    'stack_name'
  );

  const clearSearchText = () => {
    setFilterName('');
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ESGData.length) : 0;

  const handleDeleteDataSet = async () => {
    const response = await dispatch(ondeleteDataSet(selected.id));
    if (response.status === 200) {
      enqueueSnackbar('Data file deleted successfully.', {
        variant: 'success'
      });
      // dispatch(getESGDataSets());
      setSelected({ id: -1, uploadedBy: '' });
    } else {
      enqueueSnackbar('Data file not deleted successfully.', {
        variant: 'error'
      });
    }
  };

  const handleEditNewOpen = () => {
    history.push(
      `${PATH_DASHBOARD.general.ruleEditPath}/${selected.stack_name}`
    );
  };

  const isESGDataNotFound = filteredESGData.length === 0;

  return (
    <RootStyle>
      <Card>
        <DataListToolbar
          selected={selected}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onLoading={isLoading}
          onClearSearchText={clearSearchText}
          ondeleteDataSet={handleDeleteDataSet}
          onEditOpen={handleEditNewOpen}
        />

        {isLoading ? (
          <Box sx={{ my: 10 }}>
            <LoadingScreen />
          </Box>
        ) : (
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <DataListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredESGData.length}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {filteredESGData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { stack_name, version, status, provider } = row;

                      const isItemSelected = selected.stack_name === stack_name;

                      return (
                        <TableRow
                          hover
                          key={stack_name}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={(event) =>
                            stack_name == selected.stack_name
                              ? setSelected({ stack_name: stack_name })
                              : setSelected({
                                  stack_name: stack_name
                                })
                          }
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              icon={
                                <CircleUnchecked
                                  fontSize={CHECK_BOX_FONT_SIZE}
                                />
                              }
                              checkedIcon={
                                <CircleChecked fontSize={CHECK_BOX_FONT_SIZE} />
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption" noWrap>
                              {stack_name}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="caption" noWrap>
                              {version}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="caption" noWrap>
                              {status}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isESGDataNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        {ESGData.length > 0 ? (
                          <Box sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </Box>
                        ) : (
                          <EmptyContent
                            title="ESG Data Sets Not Found"
                            description="We are unable to retrieve any ESG Data Sets at the moment."
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredESGData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </RootStyle>
  );
}
