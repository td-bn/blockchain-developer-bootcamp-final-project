## Uses safe Eth transfers
Uses safe eth transfer instead of transfer or send
```javascript
    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "ETH_TRANSFER_FAILED");
    }
```

## Pull over Push
Uses withdraw functions for transfering back funds to users
```javascript
    function withdraw(uint256 _shares) external {
        uint256 _pool = balance();
        uint256 due = _pool.mul(_shares).div(totalSupply());

        _burn(msg.sender, _shares);

        if (balance() < due) {
            IController(controller).withdraw(due);
        }
        
        _safeTransferETH(msg.sender, due);
    }
```

## Checking result of .call
Uses safe eth transfer instead of transfer or send
```javascript
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "ETH_TRANSFER_FAILED");
```
