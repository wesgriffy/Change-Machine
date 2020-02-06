const changeMachine = newChangeMachine({1:20, 5:2, 10:4, 25:3});

var acceptNew = true;
var Amount = -1

function newChangeMachine(change){
    
    return function (amount, success, failure){
        const originalChange = Object.assign({}, change)
        if(acceptNew){
            Amount = amount
            acceptNew = false
        }
        var changeMade = {
            25:0,
            10:0,
            5:0,
            1:0
        }
    
    if(checkChange(change, amount)){
        Object.keys(change).reverse().forEach(function(key) { 
            while(key <= Amount && change[key] > 0){
                if(key*change[key] <= Amount){
                    changeMade[key] += change[key]
                    Amount -= key*change[key]
                    change[key] = 0
                    continue
                }
                changeMade[key] +=  1
                Amount -= key
                change[key] -= 1
            }
            
        });
        if(Amount != 0){
                failure(originalChange)
                change = originalChange
            }
            else{
                success(changeMade)
        }
    }
    else{
        failure(originalChange)
    }
    }
}

function checkChange(change, amount){
    var total = 0
    for(key in change){
        total += change[key]*key
    }
    if(total>=amount){
        return true
    }
    else{
        return false
    }
}

function success(change){
    console.log(`Success! Your change is:
    ${change[1]} pennies
    ${change[5]} nickels
    ${change[10]} dimes
    ${change[25]} quarters`);
}

function failure(change){
    console.log("Not enough coins for that transaction, coins left:")
    console.log(`
    ${change[1]} pennies
    ${change[5]} nickels
    ${change[10]} dimes
    ${change[25]} quarters`);
}

changeMachine(131, success, failure)

changeMachine(131,success,failure)