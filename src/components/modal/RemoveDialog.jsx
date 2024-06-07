import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const RemoveDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>אישור מחיקת משתמש</DialogTitle>
            <DialogContent style={{backgroundColor: 'lightcoral'}}>
                <DialogContentText>
                    האם אתה בטוח שברצונך למחוק את פרטי המשתמש שלך?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={onClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    אוקי
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemoveDialog;