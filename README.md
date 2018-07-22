
part_2

1、添加card  raect UI，注意map的使用
<Card.Group items={items}/>

2、由于next不支持css模块，只能通过link的方式手动添加
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>


3、
return{
          header:address,
          description:<a>查看众筹</a>,
          fluid:true
      }

写为 会报错
return
{
          header:address,
          description:<a>查看众筹</a>,
          fluid:true
      }
