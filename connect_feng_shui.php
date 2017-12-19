<?php

$link = mysql_connect("localhost","wp2017_groupl","2017lingouta") or die("mysql fail");
mysql_select_db("wp2017_groupl") or die("data fail");

//$id = $_POST['account'];
//$pw = $_POST['password'];
$lat= $_POST['lat'];
$lng= $_POST['lng'];

//$lat= $_POST['latitude'];
//$lng= $_POST['longitude'];
$lat_rd=round(doubleval($lat),4);
$lng_rd=round(doubleval($lng),4);
/*
$sql = "SELECT * FROM Feng_Shui where xmin <= '$lat_rd' and xmax > '$lat_rd' and ymin <= '$lng_rd' and ymax > '$lng_rd' " ; //to rewrite
$result = mysql_query($sql)or die("failll");
$array = @mysql_fetch_array($result);
$dem = intval($array[9])
*/


//$type = intval($array[3]);

$temp;

//below are to rewrite
//get the data of its 8 direction
if($lat_rd>=22.0 && $lat_rd<25.0)
{
    $lat_relative = Array($lat_rd, $lat_rd+0.0002, $lat_rd+0.0002, $lat_rd, $lat_rd-0.0002, $lat_rd-0.0002, $lat_rd-0.0002, $lat_rd, $lat_rd+0.0002);
    $lng_relative = Array($lng_rd, $lng_rd, $lng_rd+0.0002, $lng_rd+0.0002, $lng_rd+0.0002, $lng_rd, $lng_rd-0.0002, $lng_rd-0.0002, $lng_rd-0.0002);
    $sql = array();
    $results = array();
    
    

    for($i=0; $i<=8; $i++)
    {
        //echo $lat_relative[$i];
        
        $sql = "SELECT * FROM Feng_Shui where ymin < '$lat_relative[$i]' and ymax >= '$lat_relative[$i]' and xmin < '$lng_relative[$i]' and xmax >= '$lng_relative[$i]' ";
        
        $results = mysql_query($sql)or die("faillls");
        $array = @mysql_fetch_array($results);
        
        //$sql = "SELECT * FROM Feng_Shui where ymin < 22.9999 and ymax >= 22.9999 and xmin < 120.2001 and xmax >= 120.2001 ";
        //$results = mysql_query($sql)or die("faillls");
        //$array = @mysql_fetch_array($results);


        $temp = $array[4];
		
        $road[$i] = intval($array[4]);
        $waterway[$i] = intval($array[5]);
        $water[$i] = intval($array[6]);
        $grass[$i] = intval($array[7]);
        $mountain[$i] = intval($array[8]);
        $dem[$i] = intval($array[9]);
    
        
    }
    //echo $lng;
    for($i=1; $i<=8; $i++)
    {
        if($dem[$i]>$dem[0])
        {
            $high_terrain[$i]=1;
            $low_terrain[$i]=0;
            $mountain[$i]=1;
        }
        elseif($dem[$i]<$dem[0])
        {
            $high_terrain[$i]=0;
            $low_terrain[$i]=1;
        }
        else
        {
            $high_terrain[$i]=0;
            $low_terrain[$i]=0;
        }
    }
    
}

//analysis feng shui type
if($dem>=0)
{
    $type=0;
    if ( ($mountain[8]+$mountain[1]+$mountain[2]>=1) and ($mountain[4]+$mountain[5]+$mountain[6]>=1) and ($water[2]+$water[3]+$water[4]>=1) and ($water[6]+$water[7]+$water[8]>=1))
    {
        $type=84;
    }
    elseif ( ($mountain[8]+$mountain[1]+$mountain[2]+$mountain[4]+$mountain[5]+$mountain[6]>=1) and ($waterway[2]+$waterway[3]+$waterway[4]>=1) and ($waterway[6]+$waterway[7]+$waterway[8]>=1) )
    {
        $type=83;
    }
    elseif ( ($high_terrain[8]+$high_terrain[1]+$high_terrain[2]>=1) and ($waterway[2]+$waterway[3]==1 and $waterway[4]+$waterway[5]+$waterway[6]>=2) )
    {
        $type=82;
    }
    elseif ( ($mountain[8]+$mountain[1]+$mountain[2]>=1) and ($waterway[2]+$waterway[3]+$waterway[4]+$waterway[5]+$waterway[6]>=2) and ($road[6]+$road[7]+$road[8]>=1) )
    {
        $type=81;
    }
    elseif ( ($mountain[4]+$mountain[5]+$mountain[6]>=1) and ($waterway[6]+$waterway[7]+$waterway[8]>=1) and ($road[2]+$road[3]+$road[4]>=1) and ($water[8]+$water[1]+$water[2]>=1) )
    {
        $type=80;
    }
    elseif ( ($mountain[8]+$mountain[1]+$mountain[2]>=1) and ($waterway[2]+$waterway[3]+$waterway[4]>=1) and ($road[6]+$road[7]+$road[8]>=1) and ($water[4]+$water[5]+$water[6]>=1) )
    {
        $type=80;
    }
    elseif ( (($high_terrain[4]+$high_terrain[5]+$high_terrain[6]>=1) or ($low_terrain[8]+$low_terrain[1]+$low_terrain[2]>=1)) and ($waterway[6]+$waterway[7]+$waterway[8]>=2) )
    {
        $type=79;
    }
    elseif ( ($high_terrain[8]+$high_terrain[1]+$high_terrain[2]>=1) and ($waterway[6]+$waterway[7]+$waterway[8]>=2) )
    {
        $type=78;
    }
    elseif ( ($low_terrain[4]+$low_terrain[5]+$low_terrain[6]>=2) and ($mountain[1]+$mountain[2]+$mountain[3]>=2) and ($waterway[6]+$waterway[7]+$waterway[8]>=2) )
    {
        $type=77;
    }
    elseif ( ($mountain[8]+$mountain[1]+$mountain[2]>=1) and ($mountain[4]+$mountain[5]+$mountain[6]>=1) and ($waterway[2]+$waterway[3]+$waterway[4]>=1) and ($road[6]+$road[7]+$road[8]>=2) )
    {
        $type=75;
    }
    elseif ( ($mountain[8]+$mountain[1]+$mountain[2]>=1) and ($waterway[2]+$waterway[3]+$waterway[4]>=1) and ($road[6]+$road[7]+$road[8]>=1) ) 
    {
        $type=76;
    }
    elseif ( ($waterway[2]+$waterway[3]+$waterway[4]>=1) and ($road[6]+$road[7]+$road[8]>=2) )
    {
        $type=74;
    }
    elseif ( ($high_terrain[8]+$high_terrain[1]+$high_terrain[2]>=1) and ($low_terrain[4]+$low_terrain[5]+$low_terrain[6]>=1) and ($mountain[6]+$mountain[7]+$mountain[8]>=1) and ($waterway[2]+$waterway[3]+$waterway[4]>=1) )
    {
        $type=73;
    }
    elseif ( $mountain[6]==1 and $mountain[8]==1 and ($waterway[2]+$waterway[3]+$waterway[4]>=1) )
    {
        $type=72;
    }
    elseif ( $mountain[1]==1 and ($mountain[8]+$mountain[1]+$mountain[2]+$mountain[7]>=2) and ($waterway[2]+$waterway[3]+$waterway[4]>=1) )
    {
        $type=71;
    }
    elseif ( $mountain[1]==1 and ($mountain[8]+$mountain[1]+$mountain[2]+$mountain[7]>=2) and ($waterway[4]+$waterway[5]+$waterway[6]>=1) )
    {
        $type=70;
    }
    elseif ( ($high_terrain[8]+$high_terrain[1]+$high_terrain[2]>=1) and ($waterway[4]+$waterway[5]+$waterway[6]>=1) )
    {
        $type=69;
    }
    elseif ( ($high_terrain[8]+$high_terrain[1]+$high_terrain[2]>=1) and ($mountain[4]+$mountain[5]+$mountain[6]>=1) )
    {
        $type=68;
    }
    elseif ( $mountain[8]>=1 and ($waterway[4]+$waterway[5]+$waterway[6]>=1) )
    {
        $type=66;
    }
    elseif ( ($mountain[7]+$mountain[8]+$mountain[1]==1) and ($waterway[4]+$waterway[5]+$waterway[6]>=1) )
    {
        $type=65;
    }
    elseif ( ($mountain[6]+$mountain[7]+$mountain[8]>=1) and ($waterway[4]+$waterway[5]+$waterway[6]>=1) )
    {
        $type=67;
    }
    elseif ( ($mountain[8]+$mountain[1]+$mountain[2]>=1) and ($waterway[4]+$waterway[5]+$waterway[6]>=1) )
    {
        $type=64;
    }
    elseif ( ($mountain[8]+$mountain[1]+$mountain[2]>=1 or $mountain[4]+$mountain[5]+$mountain[6]>=1) and $mountain[7]==1 and ($water[2]+$water[3]+$water[4]>=1) )
    {
        $type=63;
    }
    elseif ( ($high_terrain[8]+$high_terrain[1]+$high_terrain[2]>=1) and ($high_terrain[4]+$high_terrain[5]+$high_terrain[6]>=1) and ($water[2]+$water[3]+$water[4]>=1) )
    {
        $type=62;
    }
    elseif ( ($mountain[2]+$mountain[3]+$mountain[4]>=1) and $mountain[7]==1 and ($water[4]+$water[5]+$water[6]>=1) )
    {
        $type=61;
    }
    elseif ( $high_terrain[8]==1 and ($mountain[8]+$mountain[1]+$mountain[2]>=1) and ($water[4]+$water[5]+$water[6]>=1) )
    {
        $type=60;
    }
    elseif ( ($mountain[2]+$mountain[3]+$mountain[4]>=1) and ($water[4]+$water[5]+$water[6]>=1) )
    {
        $type=59;
    }

    elseif ( $water[1]+$water[2]+$water[3]+$water[4]+$water[5]+$water[6]+$water[7]+$water[8]==8 )
    {
        $type=52;
    }
    elseif ( $water[2]==1 or ($water[1]+$water[3]==2) )
    {
        $type=56;
    }
    elseif ( $water[7]==1 or ($water[6]+$water[8]==2) )
    {
        $type=53;
    }
    elseif ( ($water[8]+$water[1]+$water[2]>=1) and ($water[4]+$water[5]+$water[6]>=1) )
    {
        $type=58;
    }
    elseif ( $water[8]==1 and $high_terrain[8]==1 )
    {
        $type=57;
    }
    elseif ( $water[4]==1 )
    {
        $type=55;
    }
    elseif ( $water[3]==1 )
    {
        $type=54;
    }
    
    elseif ( $waterway[1]+$waterway[2]+$waterway[3]+$waterway[4]+$waterway[5]+$waterway[6]+$waterway[7]+$waterway[8]==8 )
    {
        $type=35;
    }
    elseif ( $waterway[2]+$waterway[3]+$waterway[4]+$waterway[6]+$waterway[7]+$waterway[8]>=5 )
    {
        $type=34;
    }
    elseif ( ($waterway[1]+$waterway[2]+$waterway[3]+$waterway[7]+$waterway[8]>=4) and ($mountain[2]+$mountain[3]+$mountain[4]>=1) )
    {
        $type=33;
    }
    elseif ( ($waterway[1]+$waterway[5]+$waterway[6]+$waterway[7]+$waterway[8]>=4) )
    {
        $type=32;
    }
    elseif ( ($waterway[1]+$waterway[2]+$waterway[3]+$waterway[4]+$waterway[7]+$waterway[8]>=3) )
    {
        $type=31;
    }
    elseif ( ($waterway[3]+$waterway[4]+$waterway[5]>=2) and ($waterway[2]+$waterway[6]==0) )
    {
        $type=30;
    }
    elseif ( ($waterway[5]+$waterway[6]+$waterway[7]>=2) and ($waterway[4]+$waterway[8]==0) )
    {
        $type=30;
    }
    elseif ( ($waterway[8]+$waterway[1]+$waterway[2]+$waterway[3]>=2) and $waterway[1]>=0 )
    {
        $type=29;
    }
    elseif ( ($waterway[1]+$waterway[2]+$waterway[3]+$waterway[4]>=2) and $waterway[3]>=0 )
    {
        $type=28;
    }
    elseif ( ($waterway[6]+$waterway[7]+$waterway[8]+$waterway[1]>=2) and $waterway[7]>=0 )
    {
        $type=27;
    }
    elseif ( $waterway[4]==1 and $waterway[5]==1 )
    {
        $type=26;
    }
    elseif ( ($waterway[8]!=1 and $waterway[1]==1 and $waterway[2]!=1) or ($waterway[4]!=1 and $waterway[5]==1 and $waterway[6]!=1) )
    {
        $type=25;
    }
    elseif ( ($waterway[1]+$waterway[2]==2 and $waterway[5]+$waterway[6]==2) or ($waterway[8]+$waterway[1]==2 and $waterway[4]+$waterway[5]==2) )
    {
        $type=24;
    }
    elseif ( ($waterway[3]+$waterway[4]==2 and $waterway[7]+$waterway[8]==2) or ($waterway[2]+$waterway[3]==2 and $waterway[6]+$waterway[7]==2) )
    {
        $type=24;
    }
    
    elseif ( $road[1]+$road[2]+$road[3]+$road[4]+$road[5]+$road[6]+$road[7]+$road[8]==8 )
    {
        $type=50;
    }
    elseif ( $road[2]+$road[3]+$road[4]+$road[5]+$road[6]+$road[7]+$road[8]==7 )
    {
        $type=51;
    }
    elseif ( $road[1]+$road[2]+$road[3]+$road[4]+$road[8]>=5 )
    {
        $type=49;
    }
    elseif ( $road[2]+$road[3]+$road[4]+$road[5]+$road[6]>=5 )
    {
        $type=48;
    }
    elseif ( $road[4]+$road[5]+$road[6]+$road[7]+$road[8]>=5 )
    {
        $type=47;
    }
    elseif ( $road[1]+$road[2]+$road[6]+$road[7]+$road[8]>=5 )
    {
        $type=46;
    }
    elseif ( ($road[2]+$road[3]+$road[4]>=2) and ($road[6]+$road[7]+$road[8]>=2) and ($road[1]+$road[5]==0) )
    {
        $type=44;
    }
    elseif ( $road[1]+$road[2]+$road[3]+$road[6]+$road[7]+$road[8]>=5  )
    {
        $type=43;
    }
    elseif ( ($road[2]+$road[3]+$road[4]>=2) and ($road[7]+$road[8]==2) )
    {
        $type=45;
    }
    elseif ( ($road[2]+$road[3]+$road[4]>=2) )
    {
        $type=42;
    }
    elseif ( ($road[4]+$road[5]+$road[6]>=2) )
    {
        $type=41;
    }
    elseif ( ($road[8]+$road[1]+$road[2]>=2) )
    {
        $type=40;
    }
    elseif ( $road[6]!=1 and $road[7]==1 and $road[8]!=1 )
    {
        $type=39;
    }
    elseif ( $road[2]!=1 and $road[3]==1 and $road[4]!=1 )
    {
        $type=38;
    }
    elseif ( $road[8]!=1 and $road[1]==1 and $road[2]!=1 )
    {
        $type=37;
    }
    elseif ( $road[4]!=1 and $road[5]==1 and $road[6]!=1 )
    {
        $type=36;
    }
    
    
    elseif ( $high_terrain[1]+$high_terrain[2]+$high_terrain[3]+$high_terrain[4]+$high_terrain[5]+$high_terrain[6]+$high_terrain[7]+$high_terrain[8]==8 )
    {
        $type=8;
    }
    elseif ( ($high_terrain[1]+$high_terrain[3]==2) and ($low_terrain[5]+$low_terrain[7]==2) )
    {
        $type=6;
    }
    elseif ( $high_terrain[4]==1 and $high_terrain[8]==1 )
    {
        $type=9;
    }
    elseif ( $high_terrain[1]==1 and ($low_terrain[3]+$low_terrain[7]==2) )
    {
        $type=7;
    }
    elseif ( $high_terrain[1]==1 and $low_terrain[7]==1 )
    {
        $type=5;
    }
    elseif ( $high_terrain[5]==1 and $low_terrain[1]==1 )
    {
        $type=4;
    }
    elseif ( $high_terrain[1]==1 and $low_terrain[5]==1 )
    {
        $type=3;
    }
    elseif ( $high_terrain[7]==1 and $low_terrain[3]==1 )
    {
        $type=2;
    }
    elseif ( $high_terrain[3]==1 and $low_terrain[7]==1 )
    {
        $type=1;
    }

    elseif ( $mountain[1]+$mountain[2]+$mountain[3]+$mountain[4]+$mountain[5]+$mountain[6]+$mountain[7]+$mountain[8]==8 )
    {
        $type=15;
    }
    elseif ( ($mountain[1]+$mountain[2]+$mountain[6]+$mountain[8]==4) and ($mountain[3]+$mountain[4]+$mountain[5]+$mountain[7]<=1) )
    {
        $type=23;
    }
    elseif ( ($mountain[2]+$mountain[4]+$mountain[6]+$mountain[8]==4) and ($mountain[1]+$mountain[3]+$mountain[5]+$mountain[7]<=1) )
    {
        $type=22;
    }
    elseif ( ($mountain[8]+$mountain[1]+$mountain[2]+$mountain[4]+$mountain[5]+$mountain[6]>=4) and ($mountain[3]+$mountain[7]==0) )
    {
        $type=14;
    }
    elseif ( ($mountain[8]+$mountain[1]+$mountain[2]>=2) and ($mountain[4]+$mountain[5]+$mountain[6]>=2) )
    {
        $type=21;
    }
    elseif ( $mountain[6]==1 )
    {
        $type=20;
    }
    elseif ( $mountain[4]==1 )
    {
        $type=19;
    }
    elseif ( $mountain[3]==1 )
    {
        $type=18;
    }
    elseif ( $mountain[1]==1 )
    {
        $type=17;
    }
    elseif ( $mountain[7]==1 )
    {
        $type=16;
    }
    elseif ( ($mountain[1]==1 or $mountain[5]==1) and ($mountain[1]+$mountain[5]==1) )
    {
        $type=13;
    }
    elseif ( $mountain[2]+$mountain[3]+$mountain[4]>=2 )
    {
        $type=12;
    }
    elseif ( $mountain[5]==1 )
    {
        $type=11;
    }
    elseif ( ($high_terrain[1]+$high_terrain[2]+$high_terrain[3]+$high_terrain[4]+$high_terrain[5]+$high_terrain[6]+$high_terrain[7]+$high_terrain[8]==0) and ($low_terrain[1]+$low_terrain[2]+$low_terrain[3]+$low_terrain[4]+$low_terrain[5]+$low_terrain[6]+$low_terrain[7]+$low_terrain[8]==0) )
    {
        $type=10;
    }
    else
    {
        $type=85;
    }
}

if($type >= 0)
{
    
    mysql_query("SET NAMES 'utf8'"); 
    mysql_query("SET CHARACTER_SET_CLIENT=utf8"); 
    mysql_query("SET CHARACTER_SET_RESULTS=utf8"); 
    
    $sql = "SELECT * FROM Feng_Shui_mapping where type = '$type' ";
    $result = mysql_query($sql)or die("faillll");
    $array = @mysql_fetch_array($result);
    $content_1 = $array[1];
    $content_2 = $array[2];
    $content_3 = $array[3];
    $content_4 = $array[4];
    $content_5 = $array[5];
    
    
    
    //echo json_encode(array('rd'=> $lat_rd, 'relative' => $lat_relative[2],'type' => $type , 'lat' => $lat, 'lng' => $lng));
    //echo json_encode(array('0' => $road[0], '1' => $road[1], '2' => $road[2], '3' => $road[3], '4' => $road[4], '5' => $road[5], '6' => $road[6], '7' => $road[7], '8' => $road[8]));
    //echo json_encode(array('0' => $waterway[0], '1' => $waterway[1], '2' => $waterway[2], '3' => $waterway[3], '4' => $waterway[4], '5' => $waterway[5], '6' => $waterway[6], '7' => $waterway[7], '8' => $waterway[8]));
    //echo json_encode(array('type' => $type , 'type' => $type);
    echo json_encode(array('content_1' => $content_1, 'content_2' => $content_2, 'content_3' => $content_3, 'content_4' => $content_4, 'content_5' => $content_5));
}

/*
if($array[0] == $id && $array[1] == $pwod[2]!=1 and $road[3]==1 and $road[4]!=1 )
    {
 $road[2]!=1 and $road[3]==1 and $road[4]!=1 )
    {
 $road[2]!=1 and $road[3]==1 and $road[4]!=1 )
    {

{    session_start();
     $_SESSION['username'] = $id;
     $_SESSION['admit'] = true;
    echo '<meta http-equiv=REFRESH CONTENT=1;url=browse.php>';
  

}
else

{
    echo "<script type='text/javascript'>alert('wrong account or password');</script>";
    echo '<meta http-equiv=REFRESH CONTENT=1;url=browse.html>';

}
*/

?>

