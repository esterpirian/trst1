using System;
using System.Collections.Generic;

namespace my_new_app
{
    
    public class Calc
    {
        public int FirstParam { get; set; }

        public int SecParam { get; set; }

        public int Operator  { get; set; }

        public float Result  { get; set; }
         public string Key { get; set; }
    }
    public class CalcRes
    {
         public int ResultCalc{ get; set; }

        public List<Calc> DataCalc { get; set; }

       

        
    }
    public class CalcReq
    {
        public int First {get; set;}
        public int Sec {get; set;}
    }
    public class CalcValReq
    {
        public int First {get; set;}
        public int Sec {get; set;}
         public int Operator {get; set;}
          public int  Update {get; set;}
    }
    public class RmReq
    {
        
          public int  Update {get; set;}
    }
}
