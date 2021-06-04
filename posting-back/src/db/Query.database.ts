/**
 * USER QUERIES
 */
export const Q_LOGIN = 'SELECT * FROM user WHERE id = ? AND pw = ?';
export const Q_CREATE_USER = 'INSERT INTO user (id,pw,name) VALUES (?,?,?)';
export const Q_DELETE_USER = 'DELETE FROM user WHERE no = ?';
/**
 * BOARD QUERIES
 */
export const Q_GET_ALL_BOARD = 'SELECT * FROM board';
export const Q_GET_BOARD_INFO =
  'SELECT b.no,b.title,b.b_content,b.userNo,b.createdDate,u.name FROM board as b, user as u WHERE b.no = ? AND u.no = b.userNo';
export const Q_CREATE_BOARD = 'INSERT INTO board (title,b_content,userNo) VALUES (?,?,?)';
export const Q_DELETE_BOARD = 'DELETE FROM board WHERE no = ?';
export const Q_GET_MYBOARD = 'SELECT * FROM board WHERE userNo = ?';
/**
 * BOARD COMMENT QUERIES
 */
// export const Q_GET_COMMENT =
//   'SELECT * FROM board.comment INNER JOIN board.user ON user.no = comment.userNo WHERE comment.boardNodNo = ?';

export const Q_GET_COMMENT = 'SELECT * FROM board.comment WHERE comment.no = ?';
export const Q_CREATE_COMMENT = 'INSERT INTO comment (c_content, boardNo, userNo) VALUES (?,?,?)';
export const Q_DELETE_COMMENT = 'DELETE FROM comment WHERE no = ?';
