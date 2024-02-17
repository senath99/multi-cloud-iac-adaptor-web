import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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
  { id: 'uploadedDate', label: 'Date Added', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'documentType', label: 'Document Type', alignRight: false },
  { id: 'uploadedBy', label: 'Uploaded By', alignRight: false }
];

RuleAddEditForm.propTypes = {
  ESGData: PropTypes.array,
  onupdateUser: PropTypes.func,
  isLoading: PropTypes.bool
};
export default function RuleAddEditForm({
  ESGData = [],
  isLoading,
  ondeleteDataSet
}) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState({ id: -1, createdOn: '' });
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('dateAdded');

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
    'description'
  );

  const clearSearchText = () => {
    setFilterName('');
  };

  return <RootStyle>TEST</RootStyle>;
}
