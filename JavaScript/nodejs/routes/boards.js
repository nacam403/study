var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');

var connection = require('../mysqlConnection');
var upload = multer({ dest: './public/images/uploads/' });

router.get('/:board_id', function(req, res, next) {
  var boardId = req.params.board_id;
  var getBoardQuery = 'SELECT * FROM boards WHERE board_id = ' + boardId;
  var getMessagesQuery = 'SELECT M.message, ifnull(U.user_name, \'名無し\') AS user_name, DATE_FORMAT(M.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM messages M LEFT OUTER JOIN users U ON M.user_id = U.user_id WHERE M.board_id = ' + boardId + ' ORDER BY M.created_at ASC';
  connection.query(getBoardQuery, function(err, board) {
    connection.query(getMessagesQuery, function(err, messages) {
      res.render('board', {
        title: board[0].title,
        board: board[0],
        messageList: messages
      });
    });
  });
});

router.post('/:board_id', upload.single('image_file'), function(req, res, next) {
  console.log(req.file);

  var message = req.body.message;
  var boardId = req.params.board_id;
  var userId = req.session.user_id ? req.session.user_id : 0;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO messages (message, board_id, user_id, created_at) VALUES ("' + message + '", ' + '"' + boardId + '", ' + '"' + userId + '", ' + '"' + createdAt + '")';
  connection.query(query, function(err, rows) {
    res.redirect('/boards/' + boardId);
  });
});

module.exports = router;
