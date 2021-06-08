
////////////////////////



function PlayHistoryClass(){
	var cookieStr,nameArray,urlArray,allVideoArray;
	this.getPlayArray=function (){
		cookieStr = document.cookie;
		var start = cookieStr.indexOf("qike123=") + "qike123=".length,end = cookieStr.indexOf("_$_|",start),allCookieStr= unescape(cookieStr.substring(start,end))
		allVideoArray = allCookieStr.split("_$_");
		nameArray = new Array(),urlArray = new Array();
		
	}
	
}



var PlayHistoryObj=new PlayHistoryClass()

function killErrors() {
    return true;
}
window.onerror = killErrors;

var topShow=false;

	function hideTop()
	{
		for(i=0;i<2;i++) {
			var CurTabObj = document.getElementById("Tab_top_"+i) ;
			var CurListObj = document.getElementById("List_top_"+i) ;
			CurTabObj.className="history" ;
			CurListObj.style.display="none";
		}
	}
function turnOff(){
	$("#shadow").css("height",10000);
	$("#turnedOn").css("position","relative");
	$("#playbox").css("z-index",8);
	$("#shadow").show();
	$("#turnedOff").hide();
	$("#turnedOn").show();
	$("#light-switch").css("z-index",7);

	
}
function turnOn(){
	$("#turnedOff").show();
	$("#turnedOn").hide();
	$("#shadow").hide();
	$("#light-switch").css("z-index",0);

}


var __g_detail_imform_kv_display = [];
function detail_show_full(){
	const kv_len = 12
	if(!__g_detail_imform_kv_display.length){
		for (var i = 0; i < kv_len; i++){
			var new_sel = $('.detail_imform_kv:nth-child(' + i + ')');
			__g_detail_imform_kv_display.push(new_sel.css('display'));
			new_sel.css('display', 'inline-block')
		}
		$('.detail_imform_show_full').html('&lt;&lt;收起');
	}
	else{
		for (var i = 0; i < kv_len; i++){
			var new_sel = $('.detail_imform_kv:nth-child(' + i + ')');
			new_sel.css('display', __g_detail_imform_kv_display[i]);
		}
		$('.detail_imform_show_full').html('&lt;&lt;展开');
		__g_detail_imform_kv_display = [];
	}

}
function setTab(name,name2,cursel,n){
 for(i=1;i<=n;i++){
  var menu=document.getElementById(name+i);
  var con=document.getElementById(name2+i);
  menu.className=i==cursel?"on":"";
  con.style.display=i==cursel?"block":"none";
 }
}

///////////////////////////////
const __age_g_exXP = [''];
var __age_g_isfullscn = false;
var __age_g_new_playleft_id = null;
var __age_margin_bak = '';
function __age_playfull_set(_in_id, _in_title_on, _in_exXP) {
    if (!navigator.userAgent.match(/(iPhone|iPod|Android|mobile|blackberry|webos|incognito|webmate|bada|nokia|lg|ucweb|skyfire)/i)) {
        $('#' + _in_id).append('<a class="fullscn' + _in_exXP + '">' + _in_title_on + '</a>');
        if (!__age_g_isfullscn || !_in_exXP) {
            $((".fullscn" + _in_exXP)).show()
        }
        $('#' + _in_id).mouseover(function() {
            if (!__age_g_isfullscn || !_in_exXP) {
                $((".fullscn" + _in_exXP)).show()
            }
        }).mouseout(function() {
            $((".fullscn" + _in_exXP)).hide()
        });
        $((".fullscn" + _in_exXP)).click(function() {
            if (!__age_g_isfullscn) {
                $((".fullscn" + '')).html('还原窗口');
                const _new_ID = ("fullplayleft" + _in_exXP);
                $('#' + _in_id + ' iframe').css('width', '100%');
                $('#' + _in_id + ' iframe').css('height', '100%');
                __age_margin_bak = $('#' + _in_id + ' iframe').css('margin');
                $('#' + _in_id + ' iframe').css('margin', '0px');
                $('#' + _in_id).attr("id", _new_ID);
                __age_g_new_playleft_id = _new_ID;
                __age_g_isfullscn = true
            } else {
                $((".fullscn" + '')).html(_in_title_on);
                $('#' + _in_id + ' iframe').css('margin', __age_margin_bak);
                $(('#' + __age_g_new_playleft_id)).attr("id", _in_id);
                __age_g_isfullscn = false
            }
        })
    }
}
function __age_exp_playfull_set(_in_id) {
    for (var i = 0; i < __age_g_exXP.length; i++) {
        const p1 = (__age_g_exXP[i] ? ('网页' + __age_g_exXP[i] + 'P') : '网页全屏');
        const p2 = (__age_g_exXP[i] ? ('-' + __age_g_exXP[i] + 'p') : '');
        __age_playfull_set(_in_id, p1, p2)
    }
}

function __yx_SetMainPlayIFrameSRC(_in_id, cb_getplay_url){
    return __getset_play(_in_id, cb_getplay_url, 3);
}
function __ipchk_getplay(_in_data){
  const match_resl = _in_data.match(/^ipchk:(.+)/);
  if(match_resl){
    $('#ipchk_getplay').html(_in_data);
    $('#ipchk_getplay').removeAttr('hidden');
    return true;
  }
  //
  return false;
}

function __getset_play(_in_id, cb_getplay_url, cb_cnt){
    //
    const _url = window.location.href;
    const _rand = Math.random();
    const _getplay_url = cb_getplay_url();
    
      $.get(_getplay_url, function(_in_data, _in_status){
        

          //
          if(__ipchk_getplay(_in_data)){
            return false;
          }

          //
          const _json_obj = JSON.parse(_in_data);
          const _purl = _json_obj['purl'];
          const _vurl = _json_obj['vurl'];
          const _play_ex = _json_obj['ex'];
          const vlt_lr = __get_vlt_lr(_play_ex);
          //
          const _playid = _json_obj['playid'];
          var _vurlp2_getplay_url = '';
          
          document.getElementById(_in_id).src = ___make_url_vlt_param(_purl + _vurl + _vurlp2_getplay_url, vlt_lr);
          //
          return true;
      });
    
    //
    return false;
}

function __get_vlt_lr(_in_ex){
  const re_resl = _in_ex.match(/^#ex=.+#vlt=L(\d+)R(\d+)/);
  var vlt_lr = [0, 0];
  if(re_resl){
    vlt_lr = [__key_enc_vlt(re_resl[1]), __key_enc_vlt(re_resl[2])];
  }
  return vlt_lr;
}

function ___make_url_vlt_param(_in_url, vlt_lr){
  var xxx = (_in_url.indexOf('?') > 0 ? '&' : '?');
  _in_url += (xxx + 'vlt_l=' + vlt_lr[0] + '&vlt_r=' + vlt_lr[1]);
  return _in_url;
}

function __cb_getplay_url(){
    //
    const _url = window.location.href;
    const _rand = Math.random();
    const _getplay_url = (_url.replace(/.*\/play\/(\d+?)\?playid=(\d+)_(\d+).*/,'/_getplay?aid=$1&playindex=$2&epindex=$3')+'&r='+_rand);
    return _getplay_url;
}


var Age={
    'Url': document.URL,
    'Title': document.title,
    'Cookie': {
        'Set': function(name,value,days){
            var exp = new Date();
            exp.setTime(exp.getTime() + days*24*60*60*1000);
            var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            document.cookie=name+"="+encodeURIComponent(value)+";path=/;expires="+exp.toUTCString();
        },
        'Get': function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null){ return decodeURIComponent(arr[2]); return null; }
        },
        'Del': function(name){
            var exp = new Date();
            exp.setTime(exp.getTime()-1);
            var cval = this.Get(name);
            if(cval != null){ document.cookie = name+"="+encodeURIComponent(cval)+";path=/;expires="+exp.toUTCString(); }
        }
    },
   

   
    'Ajax':function(url,type,dataType,data,sfun,efun,cfun){
        type=type||'get';
        dataType=dataType||'json';
        data=data||'';
        efun=efun||'';
        cfun=cfun||'';

        $.ajax({
            url:url,
            type:type,
            dataType:dataType,
            data:data,
            timeout: 5000,
            beforeSend:function(XHR){

            },
            error:function(XHR,textStatus,errorThrown){
                if(efun) efun(XHR,textStatus,errorThrown);
            },
            success:function(data){
                sfun(data);
            },
            complete:function(XHR, TS){
                if(cfun) cfun(XHR, TS);
            }
        })
    },
  
    'Hits': {
        'Init':function() {
            if($('.age_hits').length==0){
                return;
            }
            var $that = $(".age_hits");

            Age.Ajax('/ajax/hits?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type=update','get','json','',function(r){
                if (r.code == 1) {
                    $(".age_hits").each(function(i){
                        $type = $(".age_hits").eq(i).attr('data-type');
                        if($type != 'insert'){
                            $('.'+$type).html(eval('(r.data.' + $type + ')'));
                        }
                    });
                }
            });

        }
    },

  
    'Comment':{
        'Login':0,
        'Verify':0,
        'Init':function(){

            $('body').on('click', '.comment_face_box img', function(e){
                var obj = $(this).parent().parent().parent().find('.comment_content');
                Age.AddEm(obj,$(this).attr('data-id'));
            });
            $('body').on('click', '.comment_face_panel', function(e){
                // $('.comment_face_box').toggle();
                $(this).parent().find('.comment_face_box').toggle();
            });
            $('body').on('keyup', '.comment_content', function(e){
                var obj = $(this).parent().parent().parent().parent().find('.comment_remaining');
                Age.Remaining($(this),200,obj)
            });
            $('body').on('focus', '.comment_content', function(e){
                if(Age.Comment.Login==1 && Age.User.IsLogin!=1){
                    Age.User.Login();
                }
            });

            $('body').on('click', '.comment_report', function(e){
                var $that = $(this);
                if($(this).attr("data-id")){
                    Age.Ajax('/comment/report.html?id='+$that.attr("data-id"),'get','json','',function(r){
                        $that.addClass('disabled');
                        alert(r.msg);
                        if(r.code == 1){
                        }
                    });
                }
            });

            $('body').on('click', '.comment_reply', function(e){
                var $that = $(this);
                if($that.attr("data-id")){
                    var str = $that.html();
                    $('.comment_reply_form').remove();
                    if (str == '取消回复') {
                        $that.html('回复');
                        return false;
                    }
                    if (str == '回复') {
                        $('.comment_reply').html('回复');
                    }
                    var html = $('.comment_form').prop("outerHTML");

                    var oo = $(html);
                    oo.addClass('comment_reply_form');
                    oo.find('input[name="comment_pid"]').val( $that.attr("data-id") );

                    $that.parent().after(oo);
                    $that.html('取消回复');
                }
            });

            $('body').on('click', '.comment_submit', function(e){
                var $that = $(this);
                Age.Comment.Submit($that);
            });

        },
        'Show':function($page){
            if($(".age_comment").length>0){
                Age.Ajax('/comment/ajax.html?rid='+$('.age_comment').attr('data-id')+'&mid='+ $('.age_comment').attr('data-mid') +'&page='+$page,'get','json','',function(r){
                    $(".age_comment").html(r);
                },function(){
                    $(".age_comment").html('<a href="javascript:void(0)" onclick="Age.Comment.Show('+$page+')">评论加载失败，点击我刷新...</a>');
                });
            }
        },
        'Reply':function($o){

        },
        'Submit':function($o){
            var form = $o.parents('form');
            if($(form).find(".comment_content").val() == ''){
                Age.Pop.Msg(100,20,'请输入您的评论！',1000);
                return false;
            }
            if($('.age_comment').attr('data-mid') == ''){
                Age.Pop.Msg(100,20,'模块mid错误！',1000);
                return false;
            }
            if($('.age_comment').attr('data-id') == ''){
                Age.Pop.Msg(100,20,'关联id错误！',1000);
                return false;
            }
            Age.Ajax('/comment/saveData','post','json',$(form).serialize() + '&comment_mid='+ $('.age_comment').attr('data-mid') + '&comment_rid=' + $('.age_comment').attr('data-id'),function(r){
                alert(r.msg);
                if(r.code == 1){
                    Age.Comment.Show(1);
                }
                else{
                    if(Age.Comment.Verify==1){
                        Age.Verify.Refresh();
                    }
                }
            });
        }
    }
}

$(function(){
   Age.Hits.Init();
});
