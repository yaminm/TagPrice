/**
 * Created by Menashe on 23/08/14.
 */
var DB4=[];
function getDB(tagName,AccessKEY){

    var DB=[],
        TheTAG=tagName;//THE TAG NAME
    //  instgram   hash tags
    function HashTagOb(FromWhere,created_time,fullName,profilePic,UserName,text,picUrl,countLikes,users_in_photo) {
        this.FromWhere=FromWhere;
        this.created_time = created_time;
        this.fullName =fullName;
        this.profilePic = profilePic;
        this.UserName = UserName;
        this.text = text;
        this.picUrl = picUrl;
        this.countLikes=countLikes;
        //this.nameLikesArr=ob.likes.data;
        this.users_in_photo=users_in_photo;

    }

    function instaToOb(ob){

        var text=" ";
        if (ob.caption!== null ){
            if (typeof(ob.caption.text) !== 'undefined' ){
                text=ob.caption.text;
            }
        }
        return new HashTagOb("Instagram",ob.created_time,ob.user.full_name,ob.user.profile_picture,
            ob.user.username,text,
            ob.images.standard_resolution.url,ob.likes.count,ob.users_in_photo);
    }

    var instaDB;
    jQuery(function($) {
        //instgarm
        $('.instagram').on('willLoadInstagram', function(event, options) {
            console.log("HELLO");

        });
        $('.instagram').on('didLoadInstagram', function(event, response) {
            instaDB=response.data;
            console.log("HELLO");

            //   lin=String(response.data[0].images.standard_resolution.url)

            //console.log("INSTA:"+instaDB.length);
            for(var i=0;i<instaDB.length;i++){
                DB[i]=instaToOb(instaDB[i]);
            }
            FaceBook();
            DB4=DB;
            // console.log(DB);
            // $('#theDiv').prepend('<img id="theImg" src='+ lin +' />');

        });
        $('.instagram').instagram({
            hash: TheTAG,
            clientId: '2e39de636b174160add1ed0f94462a2b'
        });



    });

    /*  facebook hash tags*/


    function FBToOb(ob,where){
        var tags;
        if (typeof(ob.likes) === 'undefined'){
            //      console.log("dont have likes");
            ob.likes=[];
        }
        if (typeof(ob.with_tags) === 'undefined'){
            tags=[];

        }
        else{
            tags=ob.with_tags.data;
            //    console.log("dont have tags");
        }


        var o= new HashTagOb("FaceBook",ob.created_time,ob.from.name,"profile_picture",
            "username",ob.message,
            ob.picture,ob.likes.length,tags);
        //    console.log(o);
        return o;
    }

    function FaceBook(){
        var FbDB,
            hashtag=TheTAG,
            accessToken=AccessKEY;

        $.get( "https://graph.facebook.com/v1.0/search?access_token="+accessToken+"&format=json&meth" +
            "od=get&pretty=0&q=%23"+hashtag+"&suppress_http_code=1&type=post"

            , function( data ) {//the answer.
                async:false;
                FbDB=data.data;
                var startPoint= DB.length;
                //console.log("facebookSize"+FbDB.length);
                for(var i=0;i<FbDB.length;i++){
                    DB[i+startPoint]=new FBToOb(FbDB[i],"faceBook");
                }
            }).done(function() {
                DB4=DB;

            });
    }



};

