import React from "react";
import { Typography, Box, Paper, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { getPaymentOrder, getPaymentSchedule, getProduct, getTotalAmountDaily } from "../../api/paymentApi";
import { useSelector } from "react-redux";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, Filler, ArcElement} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import congrat from '../../assets/image/congrat.png';
import clsx from 'clsx';
import { countPerItem } from "../../utils/countPerItem";
import restaurant from '../../assets/image/restaurant.jpg'

ChartJS.register(
    BarElement, CategoryScale, LinearScale, Title, Tooltip , Legend, PointElement,
    LineElement, Filler, ArcElement
)
ChartJS.defaults.color = '#000000';
//ChartJS.defaults.weight = 900;

export default function Statistic() {
  const classes = useStyle();
  useEffect(() => {
    getPaymentSchedule();
    getPaymentOrder();
    getTotalAmountDaily();
    getProduct();
  }, []);

  const paymentList = useSelector((state) => state.payment).payments;
  console.log(paymentList.countItem)

  const countItemList = paymentList.countItem ?  countPerItem(paymentList.countItem) : []

  // console.log('countItemList',countItemList)
  var dataAmount = {
    labels: paymentList?.totalAmount?.map((item) => item.day),
    datasets: [
        {
          fill: true,
          label: "Doanh thu",
          data: paymentList?.totalAmount?.map((item) => item.amountPerDay),
          backgroundColor: "#8090d9",
          borderColor: "#536dde",
          color: '#000000',

        }
      ],
  }

  var optionAmount = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Doanh thu 7 theo ngày",
      },
    },
    maintainAspectRatio: false,
    legend: {
      position: "top",
      labels: {
        font: {
          size: 30,
          weight: 'bold',
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  var data = {
    labels: paymentList?.schedule?.map((item) => item.day),
    datasets: [
      {
        label: "Số đơn đặt bàn",
        data: paymentList?.schedule?.map((item) => item.count),
        backgroundColor: "#36a2eb",
        //borderColor: ''
      },
      {
        label: "Số đơn mang về",
        data: paymentList?.order?.map((item) => item.count),
        backgroundColor: "#e71a1a",
        //borderColor: ''
      },
    ],
    borderWidth: 1,
  };

  var options = {
    plugins: {
      title: {
        display: true,
        text: "Đơn hàng theo tuần",
      },
    },
    maintainAspectRatio: false,
    //responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: 0,
        max: 30,
      },
    },
    // legend: {
    //     labels: {
    //         fontSize: 26
    //     }
    // }
  };

  var doughnutData = {
    labels: countItemList?.map((item) => item.name),
    datasets: [
        {
          label: "Best Seller",
          data: countItemList?.map((item) => item.quantity),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          //borderColor: "#536dde",
        }
      ],
  }
  var doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Best Seller',
        size: 30
      }
    },
    maintainAspectRatio: false 
  }
  return (
    <Box className={classes.boxContainer}>

    <Paper className={classes.paperContainer}>
      <Box className={classes.boxHeader}>
        <Typography variant="h2">Thống kê doanh thu</Typography>
      </Box>
      <Grid container className={clsx(classes.gridStat, classes.gridUp)}>
        <Grid lg={4} item className={classes.gridItem}>
          <Box className={classes.boxNoti}>
            <Box className={classes.notiBox}>
              <Avatar
                variant="square"
                src={congrat}
                className={classes.notiIcon}
              />
              <Typography className={classes.notiText}>Chúc mừng</Typography>
            </Box>
            <Typography className={classes.notiContext}>
              Bạn đang tăng trưởng tốt
            </Typography>
          </Box>
        </Grid>
        <Grid lg={8} item className={classes.gridItem}>
          <Box className={classes.boxTurnover}>
            <Line 
                data={dataAmount}
                options={optionAmount}
            />
            <Box className={classes.boxTitle}>
              <Typography variant="h4">Doanh thu 7 ngày gần nhất</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.gridStat}>
        <Grid lg={6} item className={classes.gridItem}>
          <Box className={classes.boxBar}>         
            <Bar height={400} data={data} options={options} />
          </Box>
        </Grid>
        <Grid lg={6} item className={classes.gridItem}>
          <Box className={classes.box}>
      
            <Doughnut 
              data={doughnutData}
              options={doughnutOptions}
              height={400}
              width={500}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </Box>
    
  );
}

const useStyle = makeStyles(() => ({
  boxContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(${restaurant})`,
    height: '100%',
    width: '100%'
  },
  paperContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    height: "800px",
    padding: "10px 40px 40px 40px",
  },
  boxHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  gridStat: {
    width: "100%",
    display: "flex",
    height: "42%",
    //flexDirection: 'column',
    alignItems: "center",
    //justifyContent: 'center'
  },
  gridUp: {
    paddingLeft: "25px",
  },
  gridItem: {
    height: "320px",
  },
  boxNoti: {
    width: "80%",
    height: "70%",
    backgroundColor: "#536dde",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  notiBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    width: "75%",
    paddingBottom: "6px",
  },
  notiIcon: {
    margin: "10px",
    height: "56px",
    width: "56px",
    transform: "rotate(16deg)",
  },
  notiText: {
    marginLeft: "10px",
    color: "#fff",
    fontSize: "32px",
  },
  notiContext: {
    color: "#fff",
    fontSize: "24px",
    marginBottom: "15px",
  },
  boxTurnover: {
    width: "80%",
    height: "70%",
    backgroundColor: "#ef5845",
    borderRadius: "22px",
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  boxBar: {
    //width: "80%",
    //height: "70%",
    backgroundColor: "#e5f2ff",
    borderRadius: "22px",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
  boxTitle: {
    displat: 'flex',
    textAlign: 'center'
  }
}));
