# this project is without thedll off .Net core and react
iload just the code without environment it's too large
the project is  singlepage ,use the Rout model and have component home is called FetchData
the hystory of calculation managed on cache by session 
i add  controller  to project called MyCalcController and i use rest api for post
the controller include 3 function

CalcVal-calculation or update the results by 2 values and operator,save the json to cache finaly the function return the result and list of hustory from cache
cala- the function return the result and list of hystory from cache

RmVal-the function remove record from hystory by index

component view tow input for value icon of operator and result of calculation the user enters into the input fields
at onCange event of the input i call the   CalcVal function and view the calculation and the history List
at onclick of update icon i load the value from list Hytory to calculator
at onclick of delete icon i call the RmVal function and view the new hystory list
