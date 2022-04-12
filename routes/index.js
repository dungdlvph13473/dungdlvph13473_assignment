var express = require('express');
var router = express.Router();


var db = 'mongodb+srv://dungdlvph13473:u52rRuBAp6MxIUGH@cluster0.ofjdd.mongodb.net/test'
var mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect(db).catch(err => {
  if(err){
    console.log('co loi xay ra');
  }
})

const sp = new Schema({
  ten:String,
  noidung:String,
  ngay:String,
  linkanh:String
})

const database = mongoose.model('assignment', sp);

router.get('/', async function (req, res, next) {
  console.log("vao trang chu")

  // lay danh sach
  var sanpham = await database.find({});

  res.render('index', {data: sanpham});
});

router.get('/', function(req, res, next) {


  res.render('index', { title: 'Express' });
});

router.get('/xoa', async function (req, res, next) {
  console.log("vao trang chu")

  await database.deleteOne({_id: req.query.id})

  // quay ve trang chu
  res.redirect('/');
});

router.get('/sua', async function (req, res, next) {
  console.log("vao trang chu")

  var id = req.query.id;

  database.find({_id: id}, function(err, data){
    if(!err){
      res.render('sua', {title: 'ok', data: data})
      }
  })

});

router.get('/nhapform', function (req,res){

  res.render('nhapform', {message:'nhap form'})
})

router.post('/data', function (req,res){
  var ten = req.body.ten;
  var noidung = req.body.noidung;
  var ngay = req.body.ngay;
  var linkanh = req.body.linkanh;

  const data = new database({
    ten: ten,
    noidung: noidung,
    ngay:ngay,
    linkanh: linkanh
  });

  data.save(function (error) {
    if (error) {
      res.render('index', {message: "Them KO thanh cong nhe !!!! " + error.message})
    } else {
      // res.render('index', {message: "Them thanh cong nhe !!!!"})
      res.redirect('/')
    }
  })
});
/* GET home page. */

router.post('/update', function (req, res) {

  var id = req.body.id;

  var ten = req.body.ten;
  var noidung = req.body.noidung;
  var ngay = req.body.ngay;
  var linkanh = req.body.linkanh;


  var spMoi = {
    ten: ten,
    noidung: noidung,
    ngay:ngay,
    linkanh: linkanh
  }
  database.updateOne({_id:id}, spMoi,function(err){
      res.redirect('/')
  })


})



module.exports = router;
