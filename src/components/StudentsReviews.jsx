import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import profile from '../images/profile.png';

function createData(image, student, date, comment, rating) {
    return { image, student, date, comment, rating };
}

export default function StudentsReviews({ reviews }) {
    if (!reviews) {
        return null;
    }

    const rows = reviews.map(review => createData(
        review.studentId.image ? `http://localhost:3003/${review.studentId.image}` : profile,
        review.studentId.name,
        new Date(review.commentDate).toLocaleDateString('he-IL'),
        review.comment,
        review.stars
    ));

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="students reviews table">
                <TableHead>
                    <TableRow>
                        <TableCell>תמונה</TableCell>
                        <TableCell align="right">תלמיד</TableCell>
                        <TableCell align="right">תאריך</TableCell>
                        <TableCell align="right">תגובה</TableCell>
                        <TableCell align="right">דירוג</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <React.Fragment key={index}>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <img src={row.image} alt={row.student} className="h-12 w-12 rounded-full object-cover" />
                                </TableCell>
                                <TableCell align="right">{row.student}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.comment}</TableCell>
                                <TableCell align="right">
                                    <div className="flex items-center justify-center">
                                        <span className="mr-1">{row.rating}</span>
                                        <svg className="h-5 w-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                    </div>
                                </TableCell>
                            </TableRow>
                            {index !== rows.length - 1 && (
                                <TableRow>
                                    <TableCell colSpan="5" style={{ borderBottom: '1px solid #e0e0e0' }}></TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
