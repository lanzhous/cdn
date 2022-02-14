

/////////////////////////////////


function __age_cb_getplay_url(){
  //
  const _url = window.location.href;
  const _rand = Math.random();
  var _getplay_url = (_url.replace(/.*\/play\/(\d+?)\?playid=(\d+)_(\d+).*/, '/_getplay?aid=$1&playindex=$2&epindex=$3') + '&r=' + _rand);
  //
  var re_resl = _getplay_url.match(/[&?]+epindex=(\d+)/);
  const hf_epi = ('' + FEI2(re_resl[1]));
  const t_epindex_ = 'epindex=';
  _getplay_url = _getplay_url.replace(t_epindex_ + re_resl[1], t_epindex_ + hf_epi);
  return _getplay_url;
}


function __age_play_ep_scroll(){
  const _href_url = window.location.href;
  const _refresl = _href_url.match(/\/play\/(\d+?)\?playid=(\d+)_(\d+)/);
  const _iPlay = (_refresl ? Number(_refresl[2])-1 : Number($('#DEF_PLAYINDEX').text()));
  const _iEP = (_refresl ? Number(_refresl[3])-1 : 0);

  //
  const _t_sel_movurl = '.tabs .main0 .movurl:nth-child(' + (_iPlay + 1) + ')';
  const _sel_lis = $(_t_sel_movurl + ' ul li');
  const _ep0_pos = _sel_lis[0].offsetTop;
  const _ep_pos = _sel_lis[_iEP].offsetTop;
  $(_t_sel_movurl + ' ul').scrollTop(_ep_pos - _ep0_pos);
   
  //
  if(_refresl){
    const _t_sel_ep = _t_sel_movurl + ' ul li:nth-child(' + (_iEP + 1) + ')';
    const _sel_a = $(_t_sel_ep + ' a');
    _sel_a.css('border', '1px solid #E00');
    _sel_a.css('color', '#E00');
  }
  else{
    $(document).ready(function(){
      $('#ageframediv').css('display','none');
    });
  }
}


//////////////////////////////////////////////

const __age_g_exXP = [''];
var __age_g_isfullscn = false;
var __age_g_new_playleft_id = null;
var __age_margin_bak = '';


function __age_playfull_set(_in_id, _in_title_on, _in_exXP){
  if (!navigator.userAgent.match(/(iPhone|iPod|Android|mobile|blackberry|webos|incognito|webmate|bada|nokia|lg|ucweb|skyfire)/i)) {
    $('#'+_in_id).append('<a class="fullscn' + _in_exXP + '">' + _in_title_on + '</a>');
    
    //
    if(!__age_g_isfullscn || !_in_exXP){
      $((".fullscn" + _in_exXP)).show();
    }

    //
    $('#'+_in_id).mouseover(function() {
      if(!__age_g_isfullscn || !_in_exXP){
        $((".fullscn" + _in_exXP)).show();
      }
    }).mouseout(function() {
      $((".fullscn" + _in_exXP)).hide()
    });

    //
    $((".fullscn" + _in_exXP)).click(function() {
      if(!__age_g_isfullscn){
        $((".fullscn" + '')).html('还原窗口');
        //
        const _new_ID = ("fullplayleft" + _in_exXP);
        $('#'+_in_id + ' iframe').css('width', '100%');
        $('#'+_in_id + ' iframe').css('height', '100%');
        __age_margin_bak = $('#'+_in_id + ' iframe').css('margin');
        $('#'+_in_id + ' iframe').css('margin', '0px');
        $('#'+_in_id).attr("id", _new_ID);

        //
        __age_g_new_playleft_id = _new_ID;

        //
        __age_g_isfullscn = true;
      }
      else {
        $((".fullscn" + '')).html(_in_title_on);
        $('#'+_in_id + ' iframe').css('margin', __age_margin_bak);
        $(('#' + __age_g_new_playleft_id)).attr("id", _in_id);

        //
        __age_g_isfullscn = false;
      }
    });
  };
}

function __age_exp_playfull_set(_in_id){
  for (var i = 0; i < __age_g_exXP.length; i++){
    const p1 = (__age_g_exXP[i] ? ('网页' + __age_g_exXP[i] + 'P') : '网页全屏');
    const p2 = (__age_g_exXP[i] ? ('-' + __age_g_exXP[i] + 'p') : '');
    __age_playfull_set(_in_id, p1, p2);
  }
}


///////////////////////////////

function __on_sendcomment() {
  var username = __getCookie_v3('username');
  if(!username){
    alert("登陆功能已修复，请登陆后发言");
  }
  
  $.ajax({
      type: "get",
      url: "/send_comment?" + $('#comment_form').serialize(),
  }).success(function(message) {
      if("{'err': '0'}" == message){
        $("#comment_content").val("");
      }
      else{
        alert(message);
      }
  }).fail(function(err) {
      alert('未知错误');
  });
}


///////////////////

function __on_delcomment(_in_cid, _in_sid, _in_password) {
  const r_url = '/del_comment?' + ('cid=' + _in_cid) + ('&sid=' + _in_sid) + ('&password=' + _in_password);
  $.ajax({
      type: "get",
      url: r_url,
  }).success(function(message) {
      if("{'err': '0'}" != message){
        alert(message);
      }  
      document.location.reload();
  }).fail(function(err) {
      alert('未知错误');
  });
  
}

/////////////////////////////

function __get_detail_play_page_AID(){
  var AID = window.location.href.replace(/.*\/detail\/(\d{8}).*/, '$1');
  if (AID.length != 8) {
      AID = window.location.href.replace(/.*\/play\/(\d{8})\?playid=\d+_\d+.*/, '$1');
  }
  return AID;
}

function __set_on_sendcomment() {
  //
  const AID = __get_detail_play_page_AID();
  $('#comment_id').attr('value', AID);

  /////////////////
  $('#comment_form').on('submit',
  function() {
      __on_sendcomment();
      setTimeout(function(){
        __age_show_comments_page(0);
        event.preventDefault(); //阻止form表单默认提交
      },300);
  });
}


function __timeCycle(time){
  var unixtime = time;
  var unixTimestamp = new Date(unixtime * 1000);
  var Y = unixTimestamp.getFullYear(),
    M = ((unixTimestamp.getMonth() + 1) > 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1)),
    D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate()),
    h = (unixTimestamp.getHours()<10) ? "0"+unixTimestamp.getHours() : unixTimestamp.getHours(),
    min = (unixTimestamp.getMinutes()<10) ? "0"+unixTimestamp.getMinutes() : unixTimestamp.getMinutes(),
    s = (unixTimestamp.getSeconds()<10) ? "0"+unixTimestamp.getSeconds() : unixTimestamp.getSeconds();
  var toDay = Y + '-' + M + '-' + D+ " " +h + ":" +min + ":" +s;
  return toDay;
}

function html_fmt_comments_lis(_json_obj){

  const _comments = _json_obj['comments'];
  const html_pageurls = _json_obj['html_pageurls'];
  
  //
  var html_comment_lis = '';
  for (var i = 0; i < _comments.length; i++){
    const comment_dict = _comments[i];
    const _sid = comment_dict['sid'];
    var _content_val = comment_dict['content'];
    _content_val = _content_val.replace(/\</g, '&lt;');
    _content_val = _content_val.replace(/\>/g, '&gt;');

    //
    const _time = __timeCycle(Number(comment_dict['time']));
    const _username = comment_dict['username'];

    //
    var html_li = '<li class="comment">';
    html_li += '<hr class="hrspace2">';
    html_li += ('<div class="commentcell_user">' + _username + '</div>');
    html_li += '<div class="commentcell_content">';
    html_li += ('<div>' + _content_val + '</div>');
    html_li += ('<div class="commentcell_time asciifont">' + _time + '</div>');
    html_li += '</div>';
    html_li += '</li>';
    //
    html_comment_lis += html_li;
  }

  //
  html_comment_lis += '<hr class="hrspace2">';
  html_comment_lis += '<div id="current_comment_page" page=""></div>';

  //
  $('#comment_list').html(html_comment_lis);
  $('.comment_page').html(html_pageurls);

}


function __s_show_comments_page(_in_cid, pageindex, pagesize){
  const r_url = "/get_comments?" + ('cid=' + _in_cid) + ('&pagesize=' + pagesize) + ('&pageindex=' + pageindex);
  
  $.ajax({
    type: "get",
    url: r_url,
  }).success(function(message) {
    const _json_obj = JSON.parse(message);
    html_fmt_comments_lis(_json_obj);
  }).fail(function(err) {
    alert('__s_show_comments_page failed');
  });
}

function __age_show_comments_page(pageindex){
    //
    const AID = __get_detail_play_page_AID();
    __s_show_comments_page(AID, pageindex, 10);
}

