import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { useMsal } from '@azure/msal-react';

import Subscription from '../../components/Subscriptions/Subscription';
import { useDebounceFunction } from '../../shared/useDebounceFunction';
import useDebounce from '../../shared/useDebounce';
import EnhancedTableHead from '../../components/Subscriptions/EnhancedTableHead';
import { getComparator } from '../../components/Subscriptions/comparators';
import { stableSort } from '../../components/Subscriptions/sort';
import EnhancedTableToolbar from '../../components/Subscriptions/EnhancedTableToolbar';
import DeleteSubscription from '../../components/Subscriptions/DeleteSubscription';
import { fetchSubscriptions, deleteSubscription } from '../../axios';
import authScopes from '../../shared/auth/authScopes';
import Spinner from '../../components/UI/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    margin: theme.spacing(3),
  },
  table: {
    // height: 400,
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const Subscriptions = () => {
  const classes = useStyles();
  const { instance, accounts } = useMsal();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [query, setQuery] = useState('');
  const [deleteSubDialog, setDeleteSubDialog] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 500);

  const loginScopes = { ...authScopes };

  useEffect(() => {
    if (accounts.length > 0) {
      const userName = accounts[0].username;
      const currentAccount = instance.getAccountByUsername(userName);
      const silentRequest = {
        ...loginScopes,
        account: currentAccount,
        forceRefresh: false,
      };

      const request = {
        ...loginScopes,
        loginHint: currentAccount.username,
      };

      instance
        .acquireTokenSilent(silentRequest)
        .then((res) => {
          fetchSubscriptions(debouncedQuery, res.accessToken).then((data) => {
            setSubscriptions(data);
            setLoading(false);
          });
        })
        .catch(() => useMsal.acquireTokenRedirect(request));
    }
  }, [debouncedQuery]);

  const debouncedRefreshSubs = useDebounceFunction(() => {
    setLoading(true);
    if (accounts.length > 0) {
      const userName = accounts[0].username;
      const currentAccount = instance.getAccountByUsername(userName);
      const silentRequest = {
        ...loginScopes,
        account: currentAccount,
        forceRefresh: false,
      };

      const request = {
        ...loginScopes,
        loginHint: currentAccount.username,
      };

      instance
        .acquireTokenSilent(silentRequest)
        .then((res) => {
          fetchSubscriptions('', res.accessToken).then((data) => {
            setSubscriptions(data);
            setLoading(false);
          });
        })
        .catch(() => useMsal.acquireTokenRedirect(request));
    }
  }, 500);

  const deleteSubHandler = (subs) => {
    setDeleteSubDialog(null);
    if (accounts.length > 0) {
      const userName = accounts[0].username;
      const currentAccount = instance.getAccountByUsername(userName);
      const silentRequest = {
        ...loginScopes,
        account: currentAccount,
        forceRefresh: false,
      };

      const request = {
        ...loginScopes,
        loginHint: currentAccount.username,
      };

      instance
        .acquireTokenSilent(silentRequest)
        .then((res) => {
          deleteSubscription(subs, res.accessToken);
        })
        .catch(() => useMsal.acquireTokenRedirect(request));
    }
    setSelected([]);
  };

  const requestSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const selectAllClickHandler = (event) => {
    if (event.target.checked) {
      const newSelecteds = subscriptions.map((sub) => sub);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const clickHandler = (event, sub) => {
    const selectedIndex = selected.indexOf(sub);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sub);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // prettier-ignore
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const changePageHandler = (event, newPage) => {
    setPage(newPage);
  };

  const changeRowsPerPageHandler = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, subscriptions.length - page * rowsPerPage);

  const subs = (
    <TableBody>
      {stableSort(subscriptions, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((sub, index) => {
          const isItemSelected = isSelected(sub);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              // onClick={(event) => clickHandler(event, sub)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={sub._id}
              selected={isItemSelected}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={(event) => clickHandler(event, sub)}
                />
              </TableCell>
              {/* prettier-ignore */}
              <Subscription
                id={sub._id}
                labelId={labelId}
                name={sub.name}
                status={sub.status}
              />
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );

  const deleteSubDialogHandler = () => {
    setDeleteSubDialog(
      <DeleteSubscription
        open
        onCancel={() => {
          setDeleteSubDialog(null);
        }}
        onDelete={() => {
          deleteSubHandler(selected);
        }}
        subs={selected}
      />,
    );
  };

  return (
    <div>
      <Container className={classes.container}>
        <Typography variant="h6" gutterBottom>
          My Subscriptions
        </Typography>
      </Container>
      <Container className={classes.container}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          changed={(event) => setQuery(event.target.value)}
          deleteClick={() => {
            deleteSubDialogHandler();
          }}
          value={query}
          refreshClick={() => debouncedRefreshSubs()}
        />
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={selectAllClickHandler}
              onRequestSort={requestSortHandler}
              rowCount={subscriptions.length}
            />
            {loading ? <Spinner /> : subs}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={subscriptions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={changePageHandler}
          onChangeRowsPerPage={changeRowsPerPageHandler}
        />
      </Container>
      {deleteSubDialog}
    </div>
  );
};

export default Subscriptions;
