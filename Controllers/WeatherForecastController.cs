using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace my_new_app.Controllers
{
   
    
    [ApiController]
    [Route("[controller]")]
   
    public class MyCalcController : ControllerBase
    {
         [HttpPost]
        [Route("[action]")]public CalcRes CalcVal([FromBody]CalcValReq Data){
            int val;
         switch (Data.Operator){
            case 0:
              val= Data.First+Data.Sec;
              break;
              case 1:
              val= Data.First-Data.Sec;
              break;
              case 2:
              val= Data.First/Data.Sec;
              break;
              case 3:
              val= Data.First*Data.Sec;
              break;
              default:
               val= Data.First+Data.Sec;
               break;
         }
          //HttpContext.Session.TryGetValue("indexData",out Byte[] value);
            int index;
            
             var arr=Calc();
            if(Data.Update>=0){
                index=Data.Update;
            }
            else
            {
               index=arr.Count();
            }
           
            
          
            if(Data.Update>=0 && arr.Count()>0){
               
                arr[index].FirstParam=Data.First;
                arr[index].SecParam=Data.Sec;
                arr[index].Operator=Data.Operator;
                arr[index].Result=val;
            }
            else
            {
                 arr.Add(new Calc()
                {
                    FirstParam=Data.First,SecParam=Data.Sec,Operator=Data.Operator,Result=val,Key=index.ToString()
                });
            }
          
         HttpContext.Session.Set("myData",ObjectToByteArray(arr));
          
                return new CalcRes(){DataCalc=arr,ResultCalc=val};
        }
         [HttpPost]
        [Route("[action]")]public  List<Calc> RmVal([FromBody]RmReq Data){
            
          
            
           var arr=Calc();
            if(Data.Update>=0 && arr.Count()>0){
                arr.RemoveAt(Data.Update-1);
                for(var i=Data.Update;i<arr.Count();i++){
                    arr[i].Key=i.ToString();
                }
                 HttpContext.Session.Set("myData",ObjectToByteArray(arr));
                return arr;
               
            }
            else
            {
                {
                      return new List<Calc>();
                }
            }
            
          
         
        }
        [HttpPost]
        [Route("[action]")]
        public  List<Calc> Calc()
        {
          
           
              HttpContext.Session.TryGetValue("myData",out Byte[] value);
             if (value!=null){
            var stringObj = System.Text.Encoding.ASCII.GetString(value);
        // proper way to Deserialize object
       return System.Text.Json.JsonSerializer.Deserialize<List<Calc>>(stringObj);
           }
           
            else{
               return new List<Calc>();
             
               
            }
            
           
        }
        
        private byte[] ObjectToByteArray(object obj)
        {
        // proper way to serialize object
       
        var objToString = System.Text.Json.JsonSerializer.Serialize(obj);
        // convert that that to string with ascii you can chose what ever encoding want
        return System.Text.Encoding.ASCII.GetBytes(objToString);
        }

        private dynamic ByteArrayToObject<T>(byte[] bytes)
        {
        // make sure you use same type what you use chose during conversation
        var stringObj = System.Text.Encoding.ASCII.GetString(bytes);
        // proper way to Deserialize object
        return System.Text.Json.JsonSerializer.Deserialize<T>(stringObj);
        }
    }

    
}
