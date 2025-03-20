import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Veg } from '../../../data/NeutritionVeg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { NonVeg } from '../../../data/NeutritionNonVeg';
import { height } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Nutrition() {
  const [value, setValue] = useState(0);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [purpose, setPurpose] = useState('');
  const [dietPreference, setDietPreference] = useState('');
  const [dietChart, setDietChart] = useState(null);
  const [error, setError] = useState('');
  const [weightData, setWeightData] = useState([
    { week: 'Week 1', weight: 60 },
    { week: 'Week 2', weight: 62 },
    { week: 'Week 3', weight: 64 },
    { week: 'Week 4', weight: 66 },
  ]);
  const [newWeight, setNewWeight] = useState('');
  const [week, setWeek] = useState(weightData.length + 1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Validate form inputs
    if (!age || !gender || !height || !purpose || !dietPreference) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // Generate diet chart based on age, gender, height, purpose, and diet preference
    const chart = generateDietChart(age, gender, height, purpose, dietPreference);
    setDietChart(chart);
  };

  const generateDietChart = (age, gender, height, purpose, dietPreference) => {
    // Logic to generate diet chart based on age, gender, height, purpose, and diet preference
    const vegGainPlans = [
      { breakfast: 'Oatmeal with nuts and fruits', lunch: 'Grilled tofu with quinoa and vegetables', dinner: 'Lentil soup with whole grain bread' },
      { breakfast: 'Smoothie with spinach and berries', lunch: 'Chickpea salad with avocado', dinner: 'Vegetable stir-fry with brown rice' },
      { breakfast: 'Avocado toast with tomatoes', lunch: 'Quinoa bowl with black beans', dinner: 'Stuffed bell peppers with lentils' },
      { breakfast: 'Greek yogurt with honey and nuts', lunch: 'Hummus wrap with veggies', dinner: 'Vegetable curry with rice' },
      { breakfast: 'Chia pudding with almond milk', lunch: 'Falafel salad with tahini', dinner: 'Mushroom risotto' },
      { breakfast: 'Peanut butter banana smoothie', lunch: 'Lentil soup with whole grain bread', dinner: 'Vegetable lasagna' },
      { breakfast: 'Whole grain pancakes with berries', lunch: 'Tofu stir-fry with vegetables', dinner: 'Stuffed zucchini boats' },
      { breakfast: 'Green smoothie with kale and apple', lunch: 'Vegetable sushi rolls', dinner: 'Eggplant parmesan' },
      { breakfast: 'Overnight oats with chia seeds', lunch: 'Vegetable wrap with hummus', dinner: 'Vegetable paella' },
      { breakfast: 'Fruit salad with nuts', lunch: 'Vegetable quinoa bowl', dinner: 'Vegetable enchiladas' },
      { breakfast: 'Smoothie bowl with granola', lunch: 'Vegetable stir-fry with tofu', dinner: 'Vegetable curry with rice' },
      { breakfast: 'Oatmeal with almond butter', lunch: 'Vegetable wrap with avocado', dinner: 'Vegetable pasta' },
      { breakfast: 'Green smoothie with spinach and banana', lunch: 'Vegetable salad with chickpeas', dinner: 'Vegetable stir-fry with quinoa' },
      { breakfast: 'Chia pudding with berries', lunch: 'Vegetable soup with whole grain bread', dinner: 'Vegetable stir-fry with rice' },
      { breakfast: 'Smoothie with almond milk and berries', lunch: 'Vegetable wrap with hummus', dinner: 'Vegetable curry with rice' },
    ];
    const vegLosePlans = [
      { breakfast: 'Green smoothie with kale and apple', lunch: 'Quinoa salad with mixed greens', dinner: 'Stuffed bell peppers with black beans' },
      { breakfast: 'Chia pudding with almond milk', lunch: 'Vegetable soup with whole grain bread', dinner: 'Grilled vegetables with hummus' },
      { breakfast: 'Smoothie with spinach and berries', lunch: 'Vegetable salad with chickpeas', dinner: 'Vegetable stir-fry with quinoa' },
      { breakfast: 'Oatmeal with almond butter', lunch: 'Vegetable wrap with avocado', dinner: 'Vegetable pasta' },
      { breakfast: 'Green smoothie with spinach and banana', lunch: 'Vegetable salad with chickpeas', dinner: 'Vegetable stir-fry with quinoa' },
      { breakfast: 'Chia pudding with berries', lunch: 'Vegetable soup with whole grain bread', dinner: 'Vegetable stir-fry with rice' },
      { breakfast: 'Smoothie with almond milk and berries', lunch: 'Vegetable wrap with hummus', dinner: 'Vegetable curry with rice' },
      { breakfast: 'Oatmeal with nuts and fruits', lunch: 'Grilled tofu with quinoa and vegetables', dinner: 'Lentil soup with whole grain bread' },
      { breakfast: 'Smoothie with spinach and berries', lunch: 'Chickpea salad with avocado', dinner: 'Vegetable stir-fry with brown rice' },
      { breakfast: 'Avocado toast with tomatoes', lunch: 'Quinoa bowl with black beans', dinner: 'Stuffed bell peppers with lentils' },
      { breakfast: 'Greek yogurt with honey and nuts', lunch: 'Hummus wrap with veggies', dinner: 'Vegetable curry with rice' },
      { breakfast: 'Chia pudding with almond milk', lunch: 'Falafel salad with tahini', dinner: 'Mushroom risotto' },
      { breakfast: 'Peanut butter banana smoothie', lunch: 'Lentil soup with whole grain bread', dinner: 'Vegetable lasagna' },
      { breakfast: 'Whole grain pancakes with berries', lunch: 'Tofu stir-fry with vegetables', dinner: 'Stuffed zucchini boats' },
      { breakfast: 'Green smoothie with kale and apple', lunch: 'Vegetable sushi rolls', dinner: 'Eggplant parmesan' },
    ];
    const nonVegGainPlans = [
      { breakfast: 'Eggs with avocado toast', lunch: 'Grilled chicken with quinoa and vegetables', dinner: 'Salmon with sweet potatoes' },
      { breakfast: 'Greek yogurt with berries', lunch: 'Turkey sandwich with whole grain bread', dinner: 'Beef stir-fry with brown rice' },
      { breakfast: 'Smoothie with protein powder', lunch: 'Chicken salad with avocado', dinner: 'Pork chops with mashed potatoes' },
      { breakfast: 'Omelette with vegetables', lunch: 'Tuna salad with mixed greens', dinner: 'Steak with roasted vegetables' },
      { breakfast: 'Protein pancakes with syrup', lunch: 'Chicken wrap with veggies', dinner: 'Shrimp stir-fry with rice' },
      { breakfast: 'Smoothie bowl with granola', lunch: 'Turkey burger with sweet potato fries', dinner: 'Grilled fish with quinoa' },
      { breakfast: 'Scrambled eggs with spinach', lunch: 'Chicken quinoa bowl', dinner: 'Lamb chops with couscous' },
      { breakfast: 'Protein shake with banana', lunch: 'Beef tacos with salsa', dinner: 'Grilled salmon with asparagus' },
      { breakfast: 'Greek yogurt with honey', lunch: 'Chicken sandwich with whole grain bread', dinner: 'Pork tenderloin with vegetables' },
      { breakfast: 'Smoothie with spinach and berries', lunch: 'Turkey salad with avocado', dinner: 'Beef stir-fry with brown rice' },
      { breakfast: 'Omelette with cheese', lunch: 'Tuna wrap with veggies', dinner: 'Steak with roasted potatoes' },
      { breakfast: 'Protein pancakes with berries', lunch: 'Chicken wrap with hummus', dinner: 'Shrimp stir-fry with quinoa' },
      { breakfast: 'Smoothie bowl with nuts', lunch: 'Turkey burger with salad', dinner: 'Grilled fish with vegetables' },
      { breakfast: 'Scrambled eggs with tomatoes', lunch: 'Chicken quinoa salad', dinner: 'Lamb chops with rice' },
      { breakfast: 'Protein shake with berries', lunch: 'Beef burrito with salsa', dinner: 'Grilled salmon with broccoli' },
    ];
    const nonVegLosePlans = [
      { breakfast: 'Smoothie with spinach and berries', lunch: 'Grilled chicken salad', dinner: 'Baked fish with steamed vegetables' },
      { breakfast: 'Omelette with vegetables', lunch: 'Tuna salad with mixed greens', dinner: 'Chicken soup with whole grain bread' },
      { breakfast: 'Greek yogurt with berries', lunch: 'Turkey wrap with veggies', dinner: 'Grilled shrimp with quinoa' },
      { breakfast: 'Smoothie with protein powder', lunch: 'Chicken salad with avocado', dinner: 'Pork chops with steamed vegetables' },
      { breakfast: 'Omelette with spinach', lunch: 'Tuna wrap with veggies', dinner: 'Steak with steamed broccoli' },
      { breakfast: 'Protein pancakes with berries', lunch: 'Chicken wrap with hummus', dinner: 'Shrimp stir-fry with vegetables' },
      { breakfast: 'Smoothie bowl with nuts', lunch: 'Turkey burger with salad', dinner: 'Grilled fish with vegetables' },
      { breakfast: 'Scrambled eggs with tomatoes', lunch: 'Chicken quinoa salad', dinner: 'Lamb chops with rice' },
      { breakfast: 'Protein shake with berries', lunch: 'Beef burrito with salsa', dinner: 'Grilled salmon with broccoli' },
      { breakfast: 'Greek yogurt with honey', lunch: 'Chicken sandwich with whole grain bread', dinner: 'Pork tenderloin with vegetables' },
      { breakfast: 'Smoothie with spinach and berries', lunch: 'Turkey salad with avocado', dinner: 'Beef stir-fry with brown rice' },
      { breakfast: 'Omelette with cheese', lunch: 'Tuna wrap with veggies', dinner: 'Steak with roasted potatoes' },
      { breakfast: 'Protein pancakes with berries', lunch: 'Chicken wrap with hummus', dinner: 'Shrimp stir-fry with quinoa' },
      { breakfast: 'Smoothie bowl with nuts', lunch: 'Turkey burger with salad', dinner: 'Grilled fish with vegetables' },
      { breakfast: 'Scrambled eggs with tomatoes', lunch: 'Chicken quinoa salad', dinner: 'Lamb chops with rice' },
    ];

    let plans;
    if (dietPreference === 'veg' && purpose === 'gain') {
      plans = vegGainPlans;
    } else if (dietPreference === 'veg' && purpose === 'lose') {
      plans = vegLosePlans;
    } else if (dietPreference === 'nonveg' && purpose === 'gain') {
      plans = nonVegGainPlans;
    } else if (dietPreference === 'nonveg' && purpose === 'lose') {
      plans = nonVegLosePlans;
    } else {
      return null;
    }

    // Randomly select one plan from the list
    const randomIndex = Math.floor(Math.random() * plans.length);
    return plans[randomIndex];
  };

  const handleWeightSubmit = (event) => {
    event.preventDefault();
    if (newWeight) {
      setWeightData([...weightData, { week: `Week ${week}`, weight: parseFloat(newWeight) }]);
      setWeek(week + 1);
      setNewWeight('');
    }
  };

  const handleReset = () => {
    setWeightData([]);
    setWeek(1);
  };

  useEffect(() => {
    console.log("Veg updated:", Veg);
    console.log("NonVeg updated:", NonVeg);
  }, [Veg, NonVeg]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        sx={{
          width: '90%',
          maxWidth: '1200px',
          margin: '80px auto',
          padding: '20px',
          backgroundColor: theme.palette.background.default,
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Heading */}
        <Typography variant="h3" component="h1" sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: theme.palette.primary.main }}>
          Diet Plan
        </Typography>

        {/* Form Section */}
        <Box component="form" onSubmit={handleFormSubmit} sx={{ marginBottom: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Gender"
                variant="outlined"
                fullWidth
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Height (cm)"
                variant="outlined"
                fullWidth
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                label="Purpose"
                variant="outlined"
                fullWidth
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <MenuItem value="gain">Gain Weight</MenuItem>
                <MenuItem value="lose">Lose Weight</MenuItem>
               
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                label="Diet Preference"
                variant="outlined"
                fullWidth
                value={dietPreference}
                onChange={(e) => setDietPreference(e.target.value)}
              >
                <MenuItem value="veg">Vegetarian</MenuItem>
                <MenuItem value="nonveg">Non-Vegetarian</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Get Diet Chart
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Display Error Message */}
        {error && (
          <Typography variant="body1" color="error" sx={{ textAlign: 'center', marginBottom: '20px' }}>
            {error}
          </Typography>
        )}

        {dietChart && (
  <Card sx={{ marginBottom: '20px', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
    <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '10px', fontWeight: 'bold', color: theme.palette.primary.main }}>
      Diet Chart
    </Typography>
    <Divider sx={{ marginBottom: '10px' }} />
    <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
      Breakfast:
    </Typography>
    <Typography variant="body2" sx={{ marginBottom: '10px', color: theme.palette.text.secondary }}>
      {dietChart.breakfast}
    </Typography>
    <Divider sx={{ marginBottom: '10px' }} />
    <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
      Lunch:
    </Typography>
    <Typography variant="body2" sx={{ marginBottom: '10px', color: theme.palette.text.secondary }}>
      {dietChart.lunch}
    </Typography>
    <Divider sx={{ marginBottom: '10px' }} />
    <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
      Dinner:
    </Typography>
    <Typography variant="body2" sx={{ marginBottom: '10px', color: theme.palette.text.secondary }}>
      {dietChart.dinner}
    </Typography>
  </Card>
)}

        {/* Weight Progress Chart */}
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: theme.palette.primary.main }}>
            Weight Progress
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box component="form" onSubmit={handleWeightSubmit} sx={{ marginBottom: '20px' }}>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="New Weight"
        variant="outlined"
        fullWidth
        value={newWeight}
        onChange={(e) => setNewWeight(e.target.value)}
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Weight
      </Button>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Button type="button" variant="outlined" color="primary" fullWidth onClick={handleReset}>
        Reset
      </Button>
    </Grid>
  </Grid>
</Box>





        

        {/* Tabs Section */}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            textAlign: 'center',
            margin: '0 auto 20px',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nutrition tabs"
            textColor="inherit"
            indicatorColor="secondary"
            centered
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Veg" {...a11yProps(1)} />
            <Tab label="Non-Veg" {...a11yProps(2)} />
          </Tabs>
        </Box>

        


        {/* All Tab Panel */}
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {
              Veg.length >= 1
                ? Veg.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex', 
                          flexDirection: 'column',
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)', // Slightly enlarge the card
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                          },
                        }}
                      >
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <img
                            sx={{
                              height: 140,
                              objectFit: 'cover',
                              transition: 'transform 0.3s', // Smooth transition for image zoom
                              '&:hover': {
                                transform: 'scale(1.1)', // Zoom the image on hover
                              }
                            }}
                            src={item.image}
                            title={item.name}
                            style={{width:"100%",height:"250px",objectFit:"cover"}}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {item.desc}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: theme.palette.text.primary }}>No items found</Typography>
            }
          </Grid>
          {/* Non-Veg Section */}
          <Grid container spacing={3} style={{ marginTop: '6px' }}>
            {
              NonVeg.length >= 1
                ? NonVeg.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)', // Slightly enlarge the card
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                          },
                        }}
                      >
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <img
                            sx={{
                              height: 140,
                              objectFit: 'cover',
                              transition: 'transform 0.3s', // Smooth transition for image zoom
                              '&:hover': {
                                transform: 'scale(1.1)', // Zoom the image on hover
                              }
                            }}
                            src={item.image}
                            style={{width:"100%",height:"250px",objectFit:"cover"}}
                            title={item.name}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {item.desc}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: theme.palette.text.primary }}>No items found</Typography>
            }
          </Grid>
        </CustomTabPanel>

        {/* Veg Tab Panel */}
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {
              Veg.length >= 1
                ? Veg.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          backgroundColor:"red",
                          '&:hover': {
                            transform: 'scale(1.05)', // Slightly enlarge the card
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                          },
                          
                        }}
                      >
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <img
                            sx={{
                              height: 140,
                              objectFit: 'cover',
                            }}
                            src={item.image}
                            title={item.name}
                            style={{width:"100%",height:"250px",objectFit:"cover"}}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {item.desc}
                            </Typography>
          
                          </CardContent>
                          <h5  sx={{ color: theme.palette.text.secondary }}>
                              {item.protine}
                            </h5>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: theme.palette.text.primary }}>No items found</Typography>
            }
          </Grid>
        </CustomTabPanel>

        {/* Non-Veg Tab Panel */}
        <CustomTabPanel value={value} index={2}>
          <Grid container spacing={3}>
            {
              NonVeg.length >= 1
                ? NonVeg.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height:"100%",
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)', // Slightly enlarge the card
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                          },
                        }}
                      >
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <img
                            sx={{
                              height: 140,
                              objectFit: 'cover',
                            }}
                            src={item.image}
                            title={item.name}
                            style={{width:"100%",height:"250px",objectFit:"cover"}}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {item.desc}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: theme.palette.text.primary }}>No items found</Typography>
            }
          </Grid>
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}

// CustomTabPanel Component
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}