var dates={convert:function(t){return t.constructor===Date?t:t.constructor===Array?new Date(t[0],t[1],t[2]):t.constructor===Number?new Date(t):t.constructor===String?new Date(t):"object"==typeof t?new Date(t.year,t.month,t.date):0/0},compare:function(t,e){return isFinite(t=this.convert(t).valueOf())&&isFinite(e=this.convert(e).valueOf())?(t>e)-(e>t):0/0},inRange:function(t,e,n){return isFinite(t=this.convert(t).valueOf())&&isFinite(e=this.convert(e).valueOf())&&isFinite(n=this.convert(n).valueOf())?t>=e&&n>=t:0/0}};