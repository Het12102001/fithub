const Weight = require('../model/weight');

exports.addWeight = async (req, res) => {
  const { userId, weight } = req.body;
  try {
    let userWeight = await Weight.findOne({ userId });
    if (!userWeight) {
      userWeight = new Weight({ userId, weights: [{ value: weight }] });
    } else {
      userWeight.weights.push({ value: weight });
    }
    await userWeight.save();
    res.status(200).json(userWeight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWeights = async (req, res) => {
  const { userId } = req.params;
  try {
    const userWeight = await Weight.findOne({ userId });
    if (!userWeight) {
      return res.status(404).json({ message: 'No weight data found for this user' });
    }
    res.status(200).json(userWeight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};