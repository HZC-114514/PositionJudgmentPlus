// Name: PositionJudgmentPlus
// ID: PositionJudgmentPlus
// Description: A Scratch extension for geometric position checks: point-in-shape tests, shape overlap detection, and handy math utilities.
// By: CheeseNeko_Nya
// License: GPL-3,0

//Update At 2026/10/2
//Version 1.3.5
(function () {
    function ReturnTypeChoose(Value, Returntype) {
        if (Value === null || Value === undefined) return null
        switch(Returntype){
            case "X":
                return Value[0]
            case "Y":
                return Value[1]
            default:
                return "[" + Value + "]"
        }
    }
    function StringToBoolean(v) {
        return v === true || v === "true" || v === 1 || v === "1"
    }
    function floatEQ(A, B){
        return Math.abs(A - B) < 1e-9
    }

    function ThreelessCheck(a, b, c, EQ) {
        if (EQ){
            return a <= b && b <= c
        }else{
            return a < b && b < c
        }
    }

    function SQDistance(X1, Y1, X2, Y2) {
        return (X1 - X2)**2 + (Y1 - Y2)**2
    }

    function LineCalc(X1,Y1,X2,Y2){
        return (Y1 - Y2) / (X1 - X2)
    }

    function IsParallel(X1, Y1, X2, Y2, X3, Y3, X4, Y4) {
        return floatEQ((X2 - X1) * (Y4 - Y3) - (Y2 - Y1) * (X4 - X3), 0)
    }

    function IsInTriangle(Px, Py, X1, Y1, X2, Y2, X3, Y3, IncludeBorder) {// 三角形判断
        // 向量
        const v0x = X3 - X1;
        const v0y = Y3 - Y1;
        const v1x = X2 - X1;
        const v1y = Y2 - Y1;
        const v2x = Px - X1;
        const v2y = Py - Y1;

        // 点积
        const dot00 = v0x * v0x + v0y * v0y;
        const dot01 = v0x * v1x + v0y * v1y;
        const dot02 = v0x * v2x + v0y * v2y;
        const dot11 = v1x * v1x + v1y * v1y;
        const dot12 = v1x * v2x + v1y * v2y;

        // 重心坐标
        const denom = dot00 * dot11 - dot01 * dot01;
        if (floatEQ(denom, 0)) return false;   // 三点共线返回false
        const invDenom = 1 / denom;
        const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        if (IncludeBorder){
            return (u >= 0) && (v >= 0) && (u + v <= 1);
        }else{
            return (u > 0) && (v > 0) && (u + v < 1);
        }
    }

    function IsCircleInSquare(R, Rx, Ry, X1, Y1, X2, Y2, IncludeBorder) {// 矩形圆形重叠
        let left = Math.min(X1, X2);
        let right = Math.max(X1, X2);
        let top = Math.min(Y1, Y2);
        let bottom = Math.max(Y1, Y2);

        // 1. 找到矩形上离圆心最近的点
        // 最近点的X坐标：如果圆心在矩形左侧，取left；在右侧取right；否则取圆心的X
        let closestX = Math.max(left, Math.min(Rx, right));
        // 最近点的Y坐标：如果圆心在矩形上方，取top；在下方取bottom；否则取圆心的Y
        let closestY = Math.max(top, Math.min(Ry, bottom));

        let dx = Rx - closestX;
        let dy = Ry - closestY;
        let distanceSquared = dx * dx + dy * dy;

        if (IncludeBorder){
            return distanceSquared <= R**2;
        }else{
            return distanceSquared < R**2;
        }
    }

    function isRectOverlap(X1, Y1, X2, Y2, X3, Y3, X4, Y4, IncludeBorder) {// 矩形重叠
        // 确保矩形坐标正确（左上角<右下角）
        const rect1 = { left: Math.min(X1, X2), top: Math.min(Y1, Y2), right: Math.max(X1, X2), bottom: Math.max(Y1, Y2) };
        const rect2 = { left: Math.min(X3, X4), top: Math.min(Y3, Y4), right: Math.max(X3, X4), bottom: Math.max(Y3, Y4) };

        if (IncludeBorder) {
            return !(rect1.right < rect2.left ||
                    rect1.left > rect2.right ||
                    rect1.bottom < rect2.top ||
                    rect1.top > rect2.bottom);
        } else {
            return !(rect1.right <= rect2.left ||
                    rect1.left >= rect2.right ||
                    rect1.bottom <= rect2.top ||
                    rect1.top >= rect2.bottom);
        }
    }

    function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  
        const dx1 = x2 - x1;
        const dy1 = y2 - y1;
        const dx2 = x4 - x3;
        const dy2 = y4 - y3;
        const dx3 = x3 - x1;
        const dy3 = y3 - y1;
        const denom = dx1 * dy2 - dy1 * dx2;
        if (floatEQ(Math.abs(denom), 0)) return null; // 平行或重合
        const t = (dx3 * dy2 - dy3 * dx2) / denom;

        return [
            x1 + t * dx1,
            y1 + t * dy1
        ];
    }

    class PositionJudgmentPlusmaincode {
        getInfo() {
            return {
                id: "PositionJudgmentPlus",
                name: "位置判断+",
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "点判断"
                    },

                    {
                        opcode: "OnLine",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[Px][Py]是否在[X1][Y1],[X2][Y2]的[LineType]上",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            LineType: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "LineType"
                            }
                        }
                    },

                    {
                        opcode: "Collinear",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[X1][Y1],[X2][Y2],[X3][Y3]是否共线",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3,
                            },
                        }
                    },

                    {
                        opcode: "InTriangle",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[Px][Py]是否在[X1][Y1],[X2][Y2],[X3][Y3],[IncludeBorder]的三角形上",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        opcode: "InSquare",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[Px][Py]是否在[X1][Y1],[X2][Y2],[IncludeBorder]的矩形中",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        opcode: "InCircle",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[Px][Py]是否在[X][Y]半径[Radius],[IncludeBorder]的圆中",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Radius: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "线判断"
                    },
                    
                    {
                        opcode: "Intersect",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "直线[X1][Y1],[X2][Y2]是否与直线[X3][Y3],[X4][Y4]相交",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },

                            X4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                        }
                    },

                    {
                        opcode: "Parallel",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "直线[X1][Y1],[X2][Y2]是否与直线[X3][Y3],[X4][Y4]平行",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },

                            X4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                        }
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "面判断"
                    },

                    {
                        opcode:"SquareInSquare",
                        blockType:Scratch.BlockType.BOOLEAN,
                        text: "[X1][Y1],[X2][Y2]的矩形是否与[X3][Y3],[X4][Y4],[IncludeBorder]的矩形重叠",
                        arguments:{
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        opcode:"CircleInSquare",
                        blockType:Scratch.BlockType.BOOLEAN,
                        text: "半径为[Radius],[Rx][Ry]的圆是否与[X1][Y1],[X2][Y2],[IncludeBorder]的矩形重叠",
                        arguments:{
                            Radius: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3,
                            },
                            Rx: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Ry: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        opcode:"CircleInCircle",
                        blockType:Scratch.BlockType.BOOLEAN,
                        text: "半径为[R1],[Rx1][Ry1]的圆是否与[R2],[Rx2][Ry2],[IncludeBorder]的圆重叠",
                        arguments:{
                            R1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4,
                            },
                            R2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4,
                            },
                            Rx1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Ry1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Rx2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Ry2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "额外拓展块",
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "点",
                    },

                    {
                        opcode: "Center",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "点[X1][Y1],[X2][Y2]的中点的[ReturnType]",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5,
                            },
                            ReturnType: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ReturnType"
                            }
                        }
                    },

                    {
                        opcode: "Distance",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "点[X1][Y1],[X2][Y2]的距离",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                        }
                    },

                    {
                        opcode: "PointLineDistance",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "点[Px][Py]到直线[X1][Y1],[X2][Y2]的距离",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -3,
                            },

                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                        }
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "线",
                    },

                    {
                        opcode: "Calc",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "直线[X1][Y1],[X2][Y2]的斜率",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                        }
                    },

                    {
                        opcode: "IntersectPoint",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "直线[X1][Y1],[X2][Y2]与直线[X3][Y3],[X4][Y4]的交点的[ReturnType]",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },

                            X4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            ReturnType: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ReturnType"
                            }
                        }
                    },
                ],
                
                menus:{
                    IncludeBorder:{
                        acceptReporters: true,
                        items:[
                            {
                                text: "包含边界",
                                value: true
                            },
                            {
                                text: "不包含边界",
                                value: false
                            }
                        ]
                    },

                    LineType:{
                        acceptReporters: true,
                        items:[
                            {
                                text: "直线",
                                value: "straight"
                            },
                            {
                                text: "线段",
                                value: "segment"
                            }
                        ]
                    },

                    ReturnType:{
                        acceptReporters: true,
                        items:[
                            "X",
                            "Y",
                            "XY"
                        ]
                    }
                }
            };
        }
    
    //-----------块定义-----------//

    //---------点判断---------//

        InSquare(args) {
            const ICB = StringToBoolean(args.IncludeBorder)
            return ThreelessCheck(Math.min(args.X1, args.X2), args.Px, Math.max(args.X1, args.X2), ICB) && ThreelessCheck(Math.min(args.Y1, args.Y2), args.Py, Math.max(args.Y1, args.Y2), ICB)
        }

        InCircle(args) {
            return ThreelessCheck(-1 , SQDistance(args.X, args.Y, args.Px, args.Py) , args.Radius**2 , StringToBoolean(args.IncludeBorder))
        }

        InTriangle(args) {
            return IsInTriangle(args.Px, args.Py, args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, StringToBoolean(args.IncludeBorder))
        }

        OnLine(args) {
            // 两点重合，直线/线段无定义
            if (floatEQ(args.X1, args.X2) && floatEQ(args.Y1, args.Y2)) return false;

            // 叉积判三点共线：(P - A) × (B - A) = 0
            const cross = (args.Px - args.X1) * (args.Y2 - args.Y1)
                        - (args.Py - args.Y1) * (args.X2 - args.X1);
            if (!floatEQ(cross, 0)) return false;

            // 直线：共线即在直线上
            if (args.LineType === "straight") return true;

            // 线段：在两端点之间
            if (args.LineType === "segment") {
                return ThreelessCheck(Math.min(args.X1, args.X2), args.Px, Math.max(args.X1, args.X2), true)
                    && ThreelessCheck(Math.min(args.Y1, args.Y2), args.Py, Math.max(args.Y1, args.Y2), true);
            }

            return false;
        }

        Collinear(args) {
            const cross = (args.X1 - args.X2) * (args.Y3 - args.Y2)
                        - (args.Y1 - args.Y2) * (args.X3 - args.X2);
            return floatEQ(cross, 0)
        }

        //---------线判断---------//

        Intersect(args) {
            return !IsParallel(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4)
        }

        Parallel(args) {
            return IsParallel(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4)
        }

        //---------面判断---------//

        SquareInSquare(args) {
            return isRectOverlap(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4, StringToBoolean(args.IncludeBorder))
        }

        CircleInSquare(args) {
            return IsCircleInSquare(args.Radius, args.Rx, args.Ry, args.X1, args.Y1, args.X2, args.Y2, StringToBoolean(args.IncludeBorder))
        }

        CircleInCircle(args) {
            switch(StringToBoolean(args.IncludeBorder)) {
                case false:
                    return SQDistance(args.Rx1, args.Ry1, args.Rx2, args.Ry2) < (args.R1 + args.R2)**2
                case true:
                    return SQDistance(args.Rx1, args.Ry1, args.Rx2, args.Ry2) <= (args.R1 + args.R2)**2
                default:
                    return false
            }
        }

        //---------额外拓展块---------//
        Calc(args) {
            return LineCalc(args.X1, args.Y1, args.X2, args.Y2)
        }

        Center(args) {
            return ReturnTypeChoose([(args.X1 + args.X2)/2,(args.Y1 + args.Y2)/2], args.ReturnType)
        }

        Distance(args) {
            return Math.sqrt(SQDistance(args.X1, args.Y1, args.X2, args.Y2))
        }

        PointLineDistance(args) {
            if (floatEQ(args.X1, args.X2) && floatEQ(args.Y1, args.Y2)){
                return Math.sqrt(SQDistance(args.Px, args.Py, args.X1, args.Y1))
            }else {
                const v = [args.X2 - args.X1, args.Y2 - args.Y1]
                const a = [args.X2 - args.Px, args.Y2 - args.Py]
                return Math.abs(v[0] * a[1] - v[1] * a[0]) / Math.sqrt(v[0]**2 + v[1]**2) 
            }
        }

        IntersectPoint(args) {
            if (IsParallel(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4)) return null
            return ReturnTypeChoose(lineIntersection(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4), args.ReturnType)
        }
    }
    Scratch.extensions.register(new PositionJudgmentPlusmaincode());
})();