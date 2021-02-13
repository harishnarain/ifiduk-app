import React from 'react';
import TableCell from '@material-ui/core/TableCell';

import Aux from '../../hoc/Auxilary/Auxilary';

const subscription = ({ labelId, name, status }) => (
  <Aux>
    <TableCell component="th" id={labelId} scope="row" padding="none">
      {name}
    </TableCell>
    <TableCell align="left" padding="none">
      {status}
    </TableCell>
  </Aux>
);

export default subscription;
