module.exports = mongoose => {
  const tableName = "user";
  const schema = new mongoose.Schema(
    {
      name: {
        type: String,
        max: 100,
        default:null
      },
      age: {
        type: Number,
        default:null
      },
      contact: {
        email: {
          type: String,
          default: null
        },
        phoneNumber: {
          type: String,
          default: null
        }
      },
      isActive:{
        type:Number,
        max:1,
        default:1,
        comment:"0 = inactive,1 = active"
      },
      status:{
        type:Number,
        max:1,
        default:0,
        comment:"0 = unbanned ,1 = banned"
      },
      password: String,
      loginCount:{
        type:Number,
        default:0
      }
    },
    { collection: tableName, timestamps: true }
  );
  return {
    schema: schema,
    tableName: tableName
  };
};
