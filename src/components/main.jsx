import React, { Component } from 'react';
// import Title from './title';
// import Image from './image';
// import Date from './date';
import "../styles/main.css";
import data from '../data'//need to remove

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

class Counter extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            js:[],
            isRedirect:false,
            id:'',
            subscriptions:[]
        };
        this.content=this.content.bind(this);
    }
    fetchData(){
        const that=this;
        var data = JSON.stringify([
          "toi.tech",
          "toi.sports"
        ]);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            // console.log(JSON.parse(this.responseText));
            // console.log(this.responseText);
            that.setState({js:JSON.parse(this.responseText)},()=>{
            })
          }
        });

        xhr.open("POST", "http://localhost:5000/api/fetch_articles");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
    componentDidMount() {
        this.fetchData();
        if (this.state.id) {

        } else if (window.location.search) {
            let id = window.location.search.substr(4)
            this.setState({
                id: id
            })
            localStorage.setItem("id", id);
        } else if (localStorage.hasOwnProperty('id')) {
            let id = localStorage.getItem('id').substr(4)
            this.setState({
                id: id
            })
        }

    }
    content = (x) => {
      console.log('x is',x);
        this.props.history.push({
            pathname: '/content',
            state: {
                title: x.title,
                date: x.pubDate,
                description: x.description,
                link: x.link
            }
        })
    }
    getDate(date)
    {
        var date_formatted=[];
        for(var i=0;i<date.length-5;i++)
        {
            date_formatted[i]=date[i];
        }
        return date_formatted;
    }
    SimpleCard(props,item) {
      const { classes } = props;

      return (

        <Card className={classes.card} key={item.title}>
          <CardHeader title={item.title}/>
          <CardContent >
            <Typography component="p">
              {this.getDate(item.pubDate)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" className={classes.button} onClick={()=>this.content(item)}>Learn More</Button>
          </CardActions>
        </Card>
      );
    }



    render()
    {
        /*<li dangerouslySetInnerHTML={ {__html: x.description} }/>*/
        // return(
        //    <div className="div1" style={styles.parent}>
        //     {this.state.js.map(
        //         (item)=>{
        //           return(
        //             <div key={item.title} id="parent_div" className="div2" onClick={()=>this.content(item)}>
        //               <div className="Image" >
        //                   <Image key={item.image} description={item.description} />
        //               </div>
        //               <div>
        //                   <div className="Title">
        //                       <Title key={item.title} title={item.title}/>
        //                   </div>
        //                   <div className="Date">
        //                       <Date key={item.date} date={item.date}/>
        //                   </div>
        //               </div>
        //           </div>
        //         );
        //       }
        //     )}
        //   </div>
        // );

        return (
          <div className="div1" style={styles.parent}>
            {this.state.js.map((item)=>{
              return this.SimpleCard(this.props,item)
            })}
          </div>
        )
    }
}
const styles = {
  parent:{
    marginTop:60,
    marginLeft:'10%',
    marginRight:'10%',
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },

  card: {
    minWidth: 475,
    margin:20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,

  },
  pos: {
    marginBottom: 12,
  },
};
export default withStyles(styles)(Counter);
